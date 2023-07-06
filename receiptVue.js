//Idinfo
// 連想配列でuser情報を保存
let User = {
    "1234aaa" : {
        "password" : "2000555",
        "fromName" : "tsubasaPublic",
        "fromPostCode" : "123-4567",
        "fromAdress" : "東京都 墨田区 〇〇 アーバンビル",
    }
}




// receipt Comntents
class Receipt{
    constructor(number, toAdress, money , reason, date, fromName, fromPostCode, fromAdress, whichSeal, fromSeal){
        this.number = number;
        this.toAdress = toAdress;
        this.money = money;
        this.reason = reason;
        this.date = date;

        this.fromName = fromName;
        this.fromPostCode = fromPostCode;
        this.fromAdress = fromAdress;
        
        this.whichSeal = whichSeal;
        this.fromSeal = fromSeal;
    }
}

// vue.component
// DOM
let receipt_component = {
    data() {
        return {
        }
    },

    props : ['item'],

    template :
    `
    <div style="width: 40rem;" id="output" class="mb-5">
        <div class="m-2 py-3 px-4 container border border-5 rounded shadow">
            
            <!-- 番号と領収日 -->
            <div class="row">
                <div class="d-flex">
                    <h1 class="col-3 my-auto">領収書</h1>
                    <div class="d-flex flex-column col-9">
                        <h5 class="text-end">No: {{ item.number }}</h5>
                        <h5 class="text-end"> {{ item.date }} </h5>
                    </div>
                </div>
            </div>

            <!-- 宛先 -->
            <div class="row mt-4">
                <h5 class="border-bottom border-3"> {{ item.toAdress }} 御中</h5>
            </div>

            <!-- 金額 -->
            <div class="row mt-4">
                <h2 class="text-center"> ￥ {{ item.money }} </h2>
            </div>

            <!-- 取引内容 -->
            <div class="row mt-4 bm-0">
                <h5>但: {{ item.reason }}</h5>
            </div>

            <!-- 会社の住所とはんこ -->
            <div class="row mt-0">
                    <!-- 住所 -->
                    <div class="d-flex flex-column text-center col-8">
                        <p class="w-100 m-0"> {{ item.fromName }} </p>
                        <p class="w-100 m-0"> 〒 {{ item.fromPostCode }} </p>
                        <p class="w-100 m-0"> {{ item.fromAdress }} </p>
                    </div>

                    <!-- 自分のはんこ -->
                    <div class="col-2 d-flex flex-column align-items-center border">
                        <p>自分</p>
                        <img src="./image/fukaya_kaisyo-l-size.png" height="40rem" width="40rem" id="ourSeal" v-if="item.whichSeal == 'true'">
                    </div>

                    <!-- 相手のはんこ -->
                    <div class="col-2 d-flex flex-column align-items-center border">
                        <p>相手</p>
                        <img src="./image/ishihara_kaisyo-l-size.png" height="40rem" width="40rem" id="partnerSeal" :class="{'d-none':item.fromSeal}">
                    </div>
            </div>
    `,

}

var component = {
    data: function(){
        return {
        count: 0
        }
    },
    template: "<p>{{count}}<button @click='increment'>+1</button></p>",
    methods: {
        increment: function(){
            this.count += 1;
        }
    }
}


Vue.component("card", receipt_component);
// vue.main
const vm = new Vue({
    el:'#app',
    data:{
        number: 0,
        toAdress: "fukayaPublic",
        money: null,
        date: new Date().toLocaleDateString("ja"),
        reason: "",
        whichSeal: "false",

        fromID:"",
        fromPass:"",
        fromName:"",
        fromPostCode:"",
        fromAdress:"",
        fromSeal:true,

        receipts: [],
    },

    methods:{
        makeReceiptObject : function() {
            let receipt = new Receipt(this.number, this.toAdress, this.money, this.reason, this.date, this.fromName, this.fromPostCode, this.fromAdress, this.whichSeal, this.fromSeal)
            this.receipts.push(receipt);
            // console.log(receipt);
            
            // reset
            this.number++;
            this.fromName = "";
            this.fromPostCode = "";
            this.fromAdress = "";

            this.money = null;
            this.reason = "";

            this.fromSeal = true;
            this.whichSeal = "false";
        },
        login : function() {
            // DOMの取得
            const IDContent = document.getElementById("fromID");
            const PassContent = document.getElementById("fromPass");

            // ここは先にIDが存在するかをみて無駄をなくす
            if(User[this.fromID] !== undefined && User[this.fromID].password == this.fromPass){
                // ログインに成功した場合、VueデータをUserオブジェクトのものと置き換え、エラーメッセージを消す
                this.fromName = User[this.fromID].fromName;
                this.fromPostCode = User[this.fromID].fromPostCode;
                this.fromAdress = User[this.fromID].fromAdress;
                this.fromSeal = false;


                // エラーメッセージの消去
                IDContent.classList.remove("is-invalid");
                PassContent.classList.remove("is-invalid");
                IDContent.classList.add("is-valid");
                PassContent.classList.add("is-valid");
            }
            else{
                // ログインに失敗した場合、フォームリセットとエラーメッセージの出力
                // reset
                this.fromID = "";
                this.fromPass = "";
                this.fromName = "";
                this.fromPostCode = "";
                this.fromAdress = "";
                this.fromSeal = true;

                //エラーメッセージ
                IDContent.classList.add("is-invalid");
                PassContent.classList.add("is-invalid");
            }
        }
    },
})