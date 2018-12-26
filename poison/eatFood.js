var app = new Vue({
    el: "#app",
    data: {
        foodList: [],
        windowWidth: document.body.clientWidth,
        windowHeight: document.body.clientHeight,
        appWidth: document.querySelector("#app").clientWidth,
        appHeight: document.querySelector("#app").clientHeight,
        foodNum: "",
        person: {}

    },
    methods: {
        start() {
            console.log('111111');

            this.foodList = [];
            for (let i = 0; i < this.foodNum; i++) {
                this.foodList.push({
                    top: Math.random() * this.appHeight,
                    left: Math.random() * this.appWidth,
                    bgColor: '#' + Math.floor(Math.random() * 0xffffff).toString(16)
                })

            }
            this.person = {
                width: "20px",
                height: "20px",
                bgColor: "#000",
                x: 0,
                y: 0,
                left: 0,
                top: 0
            };
        },
        persondown(e) {
            this.person.isDown = true;
            this.person.x = e.clientX - parseInt(this.person.offsetLeft);
            this.person.y = e.clientY - parseInt(this.person.offsetTop);

            console.log(this.person.offsetLeft)

        },
        personup(e) {
            this.person.isDown = false;

            console.log(this.person.top)
        },
        personmove(e) {
            if (this.person.isDown == true) {
                this.person.left = e.clientX - this.person.x + 'px';
                this.person.top = e.clientY - this.person.y + 'px';
                console.log(this.person.left);
            }

        }
    },
    created: function () {
        this.foodNum = this.appWidth * 10;
        this.appWidth = this.windowWidth * 4;
        this.appHeight = this.windowHeight * 4;

    }
})