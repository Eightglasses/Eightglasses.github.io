<template>
	<div class="dungeons-list">
		<navBar title="界面"></navBar>
		<div class="name">
			<p @click="setM">开始游戏</p>
		</div>
		<div class="monster">
			<ul class="flex flexwrap">
				<li v-for="(item,index) in totalfb" @click="gameTap(item,index,$event)" v-bind:class="{'checked':item.checked }">
					<template v-if="item.hasMonster">
						<p @click="killMonster(item)">
							<span>攻击力{{item.att}}</span>
							<span>血量{{item.health}}</span>
							<span>{{item.name}}</span>
						</p>
					</template>
				</li>
			</ul>
		</div>
		<div class="userinfo">
			<p>姓名:{{nowInfo.username}}</p>
			<p>当前血量:{{nowInfo.health}}</p>
			<p>攻击力:{{nowInfo.attack}}</p>
		</div>
	</div>
</template>
<script>
	import navBar from "@/components/navbar";
	import shadowdiv from "@/components/shadowdiv";
	import Vue from 'vue'
	var totalfb = [{
		name: 'a',
		checked: false,
		hasMonster: ''
	}, {
		name: 'b',
		checked: false,
		hasMonster: ''
	}, {
		name: 'c',
		checked: false,
		hasMonster: ''
	}, {
		name: 'd',
		checked: false,
		hasMonster: ''
	}, {
		name: 'e',
		checked: false,
		hasMonster: ''
	}, {
		name: 'f',
		checked: false,
		hasMonster: ''
	}, {
		name: 'g',
		checked: false,
		hasMonster: ''
	}, {
		name: 'h',
		checked: false,
		hasMonster: ''
	}, {
		name: 'i',
		checked: false,
		hasMonster: ''
	}, {
		name: 'j',
		checked: false,
		hasMonster: ''
	}, {
		name: 'k',
		checked: false,
		hasMonster: ''
	}, {
		name: 'l',
		checked: false,
		hasMonster: ''
	}, {
		name: 'm',
		checked: false,
		hasMonster: ''
	}, {
		name: 'n',
		checked: false,
		hasMonster: ''
	}];

	export default {
		name: "",
		components: {
			navBar: navBar,
			shadowdiv: shadowdiv
		},
		methods: {
			killMonster(item) {
				let nowHealth = (item.health) - (this.Monster[this.nandu].maxAtt); //怪物剩余血量
				if(this.nowInfo.health <= 0) {
					alert('你die了');
					return false;
				}
				if(nowHealth < 0) {
					nowHealth = 0;
					item.hasMonster = false;
				};
				this.nowInfo.health = this.nowInfo.health - (this.Monster[this.nandu].maxAtt)
				Vue.delete(item, 'health');
				Vue.set(item, 'health', nowHealth);
				console.log(item.health);
				console.log(this.Monster[this.nandu].maxAtt);
				
			},
			gameTap(item, index, _this) {
				if(this.gameing == false) {
					if(item.checked == true) {
						return false;
					} else {
						item.checked = true; //已经点过的就不能点击了
					}
				}
			},
			setM() {
				if(this.gameing) {
					let nowGuan = this.guanka; //当前关卡
					let nowNan = this.nandu; //当前难度
					let monsterN = 0;
					function randomM(t, m, _this) {
						//console.log(_this)
						for(let i = 0; i < t.length; i++) {
							var ran = parseInt(Math.random() * 100);
							if(ran < m[nowNan].odds) {
								t[i].hasMonster = true;
								t[i].att = _this.Monster[_this.nandu].maxAtt;
								t[i].health = _this.Monster[_this.nandu].maxHealth;
								t[i].name = _this.Monster[_this.nandu].name[0];
								monsterN++;
							}
						}
					}
					randomM(this.totalfb, this.Monster, this);
					console.log(monsterN + '第一次')
					if(monsterN < 3 || monsterN > this.totalfb.length / 2) {
						randomM(this.totalfb, this.Monster);
					}
					console.log(monsterN + '第二次')
					console.log(this.nowInfo)
					this.gameing = false;
				}

			}
		},
		mounted: function() {
			this.nandu = this.$route.query.nandu;
			this.guanka = this.$route.query.guanka;
			this.nowInfo = JSON.parse(window.localStorage.getItem('nowInfo'));

		},
		computed: {},
		data() {
			return {
				totalfb: totalfb,
				nandu: '', //难度
				nowInfo: '', //当前用户信息
				clicked: '',
				totalfbArr: '',
				guanka: '',
				gameing: true,
				/*
				 * 核心理论
				 * 
				 * 普通1关
				 * 出现几率1/5
				 * Att 0-3，health 1-10，区间随机
				 * 
				 * 英雄1关
				 * 出现几率1/4
				 * Att 1-4,health 2-20
				 * 
				 * 
				 * 关数+1则att、health + 1 
				 */
				Monster: {
					pt: { //普通
						maxAtt: 3,
						minAtt: 0,
						maxHealth: 10,
						minHealth: 1,
						odds: 20, //每次点击出现几率
						name: ['克苏恩', '玛法里奥', '死亡之翼', '瓦王', '伊利丹', '萨尔'] //随机名
					},
					yx: { //英雄
						maxAtt: 4,
						minAtt: 1,
						maxHealth: 20,
						minHealth: 2,
						odds: 25,
						name: ['克苏恩big', '玛法里奥big', '死亡之翼big', '瓦王big', '伊利丹big', '萨尔big']
					}
				}
			}
		},
	}
</script>

<style>
	input {
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.name {
		margin: 0.5rem;
	}
	.name p {
		border: 1px #333 solid;
		text-align: center;
		padding: 0.3rem 0;
	}
	.fb-list {
		margin: 1rem;
	}
	li {
		width: 1rem;
		height: 1rem;
		border: 1px solid #E2E2E2;
		background: #ccc;
	}
	li span {
		display: none;
	}
	li.checked span {
		display: block;
	}
	li.checked {
		background: #ddd;
	}
	.userinfo {
		position: absolute;
		bottom: 1rem;
		width: 100%;
	}
	.userinfo p {
		padding: 0.3rem;
		margin: 0;
		text-align: center;
		border-bottom: 1px solid #001423;
	}
</style>