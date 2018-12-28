var app = new Vue({
    el: "#app",
    data: {
        foodList: [],
        windowWidth: document.body.clientWidth,
        windowHeight: document.body.clientHeight,
        appWidth: document.querySelector("#app").clientWidth,
        appHeight: document.querySelector("#app").clientHeight,
        foodNum: "", //小球个数
        person: { //大球属性
            width: 50,
            height: 50,
            bgColor: "#000",
            x: 0,
            y: 0,
            left: 200,
            top: 200,
            at: false
        }

    },
    methods: {
        //开始
        start() {
            //先清空小球
            this.foodList = [];
            this.appendBall();
            this.person = {
                width: 50,
                height: 50,
                bgColor: "#000",
                x: 0,
                y: 0,
                left: 200,
                top: 200
            };
        },

        //鼠标按下
        persondown(e) {
            this.person.isDown = true;
            this.person.x = e.clientX - parseInt(this.person.left);
            this.person.y = e.clientY - parseInt(this.person.top);


        },
        //鼠标弹起
        personup(e) {
            this.person.isDown = false;
        },
        //鼠标移动
        personmove(e) {
            if (this.person.isDown == true) {
                this.person.left = e.clientX - this.person.x;
                this.person.top = e.clientY - this.person.y;
                var l = this.person.left;
                var t = this.person.top;
                var r = this.person.left + this.person.width;
                var b = this.person.top + this.person.height;

                for (let i = 0; i < this.foodList.length; i++) {
                    duang(this.foodList[i])
                }
                //碰撞监测
                function duang(tf) {
                    if (tf == null) {
                        return;
                    }

                    if (r < tf.left + 10 || b < tf.top + 10 || l > (tf.left + tf.width) + 10 || t > (tf.top + tf.height) + 10) {
                        //如果全都碰不上
                    } else {
                        //否则碰上，删除碰上的
                        var index = app.foodList.indexOf(tf);
                        app.foodList.splice(index, 1);
                        //设置大球大小，以及最大大小
                        app.person.width > 200 ? app.person.width = 200 : app.person.width = app.person.width + tf.width / 100;
                        app.person.height > 200 ? app.person.height = 200 : app.person.height = app.person.height + tf.height / 100;
                    }
                }


            }

        },
        //生成小球
        appendBall() {

            for (let i = 0; i < this.foodNum; i++) {
                this.foodList.push({
                    top: Math.random() * this.appHeight,
                    left: Math.random() * this.appWidth,
                    width: Math.random() * 10 + 10,
                    height: Math.random() * 10 + 10,
                    bgColor: '#' + Math.floor(Math.random() * 0xffffff).toString(16)
                })

            }
        },
        //大球自动移动
        autorun() {
            this.at = !this.at;
            var time = null;
            if (this.at) {

                setInterval(() => {
                    console.log(app.randomFrom(-200, 200))
                })

                setInterval(() => {
                    let wl = app.person.left + app.randomFrom(-200, 200)
                    let wt = app.person.top + app.randomFrom(-200, 200)
                    let speed = wl / 2000;

                    let ol = app.person.left;
                    let ot = app.person.top;

                    app.person.left = wl;

                    setInterval(() => {
                    
                        
                        app.person.left = app.person.left + (wl - ol) / 2000;
                        
                        app.person.top = app.person.top + (wt - ot) / 2000;

                 

                        //如果大球预计位置小于0
                        if (app.person.left < 0) {
                            app.person.left = 0;
                        }
                        //如果大球位置超出屏幕
                        if (app.person.left > app.windowWidth - app.person.width) {
                            app.person.left = app.windowWidth - app.person.width;
                        }
                        if (app.person.top < 0) {
                            app.person.top = 0;
                        }
                        if (app.person.top > app.windowHeight - app.person.height) {
                            app.person.top = app.windowHeight - app.person.height;
                        }



                    }, speed);

                }, 2000);




            }
        },
        randomFrom(lowerValue, upperValue) {
            return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
        }

    },
    created: function () {

        this.foodNum = 200;
        this.appWidth = this.windowWidth;
        this.appHeight = this.windowHeight;

    },
    watch: {
        foodList(o, n) {

            if (o.length < this.foodNum / 2) {
                this.appendBall();
            }
        }
    },
})