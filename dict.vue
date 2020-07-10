<template>
    <div class="dict">
      <!-- 导航 -->
      <div class="tips">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">系统首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>字典管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="search">
        <el-select v-model="dictType" size="small" placeholder="请选择类型">
          <el-option v-for="item in options" :key="item.value" :label="item.textval" :value="item.code"></el-option>
        </el-select>
        <div class="search-box">
          <el-input size="small" v-model="pcode" placeholder="请输入上级编码"></el-input>
        </div>
        <div class="search-box">
          <el-input size="small" v-model="code" placeholder="请输入编码"></el-input>
        </div>
        <div class="search-box">
          <el-input size="small" v-model="textval" placeholder="请输入文本"></el-input>
        </div>
        <div class="search-box">
          <el-button size="small" type="primary" @click="handleClickSearch">搜索</el-button>
        </div>
      </div>
      <div class="operation">
        <el-button type="primary" size="mini" @click="handleClickNew">新增</el-button>
      </div>
      <div class="table-list">
        <el-table :data="tableData" stripe border>
          <el-table-column prop="dictType" label="类型"></el-table-column>
          <el-table-column prop="pcode" label="上级编码"></el-table-column>
          <el-table-column prop="code" label="编码"></el-table-column>
          <el-table-column prop="textval" label="文本"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1">有效</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="pagination" background layout="sizes, prev, pager, next"
                       :current-page.sync="page.curPage"
                       :page-size.sync="page.pageSize"
                       :total="page.totalRow"
                       :page-sizes="[10, 20, 50, 100]"
                       @current-change="page.curPageChange"
                       @size-change="page.pageSizeChange">
        </el-pagination>
      </div>
      <el-dialog title="新增" :visible.sync="dialogNew" width="400px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="">
            <el-input v-model="ruleForm.dictType"></el-input>
          </el-form-item>
          <el-form-item prop="">
            <el-input size="small" v-model="ruleForm.pcode" placeholder="上级编码"></el-input>
          </el-form-item>
          <el-form-item prop="">
            <el-input size="small" v-model="ruleForm.code" placeholder="编码"></el-input>
          </el-form-item>
          <el-form-item prop="">
            <el-input size="small" v-model="ruleForm.textval" placeholder="文本"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "dict",
        data(){
            return{
                dictType:'',
                options:[],
                tableData:[],
                pcode:'',
                code:'',
                textval:'',
                page: {
                    // 当前页；默认1
                    curPage: 1,
                    // 当前页条数；默认50
                    pageSize: 10,
                    // 总条数
                    totalRow: 0,
                    // 当前页改变
                    curPageChange: val => {
                        this.page.curPage = val;
                        this.load();
                    },
                    // 每页条数改变
                    pageSizeChange: val => {
                        this.page.curPage = 1;
                        this.page.pageSize = val;
                        this.load();
                    }
                },
                dialogNew:true,
                ruleForm:{
                    dictType:'',
                    pcode:'',
                    code:'',
                    textval:''
                },
                rules:{

                }
            }
        },
        mounted() {
            this.load();
            this.findAll();
            this.englishToChinese ()
        },
        methods:{
            load (){
              let param = {
                  dictType:this.dictType,
                  code:this.code,
                  textval:this.textval,
                  pcode:this.pcode,
                  limit: 15,
                  curPage: this.page.curPage,
                  pageSize: this.page.pageSize
              };
              axios.post('mgr/dict/list',qs.stringify(param))
                  .then(res => {
                      this.tableData = res.data.data.list;
                      this.page.totalRow = res.data.data.totalRow;
                  });
            },
            findAll(){
                axios.post('mgr/dictType/findAll')
                    .then(res => {
                        this.options = res.data.data
                    })
            },
            // 英文转中文
            englishToChinese (){
                axios.post('mgr/dictType/findAll')
                    .then(res => {
                        let array = res.data.data;
                        array.forEach((item, index, array) => {
                            console.log(item);
                        });
                    })
            },
            // 搜索
            handleClickSearch () {
                let param = {
                    dictType:this.dictType,
                    code:this.code,
                    textval:this.textval,
                    pcode:this.pcode,
                    limit: 15,
                    curPage: this.page.curPage,
                    pageSize: this.page.pageSize
                };
                axios.post('mgr/dict/list',qs.stringify(param))
                    .then(res => {
                        this.tableData = res.data.data.list;
                    });
            },
            //新增按钮
            handleClickNew () {

            }

        }
    }
</script>

<style scoped lang="stylus">
  .tips
    background #fff
    padding 10px 0
    color #6d6d6d
    margin-bottom 10px
  .table-list
    margin-top 10px
  .search
    display flex
  .search-box
    width 193px
    margin-left 10px
  .pagination
    margin-top 20px
    text-align center
  .operation
    margin-bottom 10px
    display flex
    justify-content flex-end
</style>
