// モーダルの非表示設定
// DOMの宣言
const modalOpenBtn = document.getElementById("modal-open");
const modalCloseBtn = document.getElementById("modal-close");
const modalContent = document.getElementById("modal-content");
const overlayContent = document.getElementById("overlay");


// modalの表示機能の作成
modalOpenBtn.addEventListener('click', () => {
    // ブロックを作成してからアニメーションを実行
    modalContent.classList.remove("d-none");
    modalContent.classList.add("d-block");
    modalContent.classList.add("modalAppear");

    //overlayをopasity0.8で出現させる
    overlayContent.classList.remove("d-none");
    overlayContent.classList.add("overlayDilute");
});


// modalの消去機能の作成
modalCloseBtn.addEventListener('click', () => {
    // ボタンを押すたびにクラスが増え続けるから消しておき、ブロックも消去
    modalContent.classList.remove("modalAppear");
    modalContent.classList.remove("d-block");
    modalContent.classList.add("d-none");

    //overlayを消す
    overlayContent.classList.add("d-none");
    overlayContent.classList.remove("overlayDilute");

});

overlayContent.addEventListener('click', () => {
    // ボタンを押すたびにクラスが増え続けるから消しておき、ブロックも消去
    modalContent.classList.remove("modalAppear");
    modalContent.classList.remove("d-block");
    modalContent.classList.add("d-none");

    //overlay
    overlayContent.classList.add("d-none");
    overlayContent.classList.remove("overlayDilute");

})