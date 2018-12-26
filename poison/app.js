var app = new Vue({
    el: "#app",
    data: {
        one: {
            width: "",
            height: "",
            attack: "",
            health: "",
            speed: ""
        },
        monsterList: [],
        monsterNum: 10,
        windowWidth: document.body.clientWidth,
        windowHeight: document.body.clientHeight
    },
    methods: {
        generate: function () {
            this.monsterList = [];
            for (let i = 0; i < this.monsterNum; i++) {
                this.monsterList.push({
                    width: Math.ceil(Math.random() * 20 + 50),
                    height: Math.ceil(Math.random() * 20 + 50),
                    attack: Math.ceil(Math.random() * 10),
                    health: Math.ceil(Math.random() * 20 + 50),
                    speed: Math.ceil(Math.random() * 10),
                    top: Math.random() * this.windowHeight,
                    left: Math.random() * this.windowWidth
                })

            }
        }
    },
    created() {
        console.log(this.windowWidth, this.windowHeight);

        setInterval(() => {

            for (let i = 0; i < this.monsterList.length; i++) {
                this.monsterList[i].top = Math.random() * this.windowHeight;
                this.monsterList[i].left = Math.random() * this.windowWidth;

                console.log(this.monsterList[i].top)
            }

        }, 2000);
    }
})