'use strict';
{

class Panel {
  constructor() {
    //section要素を作成 panel class
    const section = document.createElement('section');
    section.classList.add('panel');
    //image要素を作成
    this.img = document.createElement('img');
    this.img.src = this.getRandomImage();/*'img/seven.png'とりあえずseven.pngとしておく→ランダムのimgに*/
    //div要素の作成 stop class
    this.stop = document.createElement('div');
    this.stop.classList.add('stop', 'inactive');
    this.stop.textContent = 'STOP';
    //みやすさを重視してtimeoutIdはconstructorに定義
    this.timeoutId = undefined;
    //stopのeventListenerを設定
    this.stop.addEventListener('click', () => {
    //stopボタンを押したときに、再度プログラムが走らないようにする。色を薄くする(inactive)。
    if (this.stop.classList.contains('inactive')) {
    return;
    }
    this.stop.classList.add('inactive');
      clearTimeout(this.timeoutId);
      //panelsLeftを1減らす
      panelsLeft --;
      //パネルを全部選び終えたら、正誤判定を行うcheckResult()
      if(panelsLeft === 0) {
        checkResult();
        //正誤判定が終わったら、もう一度spinボタンを押せるようにする
        spin.classList.remove('inactive');
        //panelsLeftを初期値に戻す
        panelsLeft = 3;
      }
    });
    //sectionにimgとstopを入れる
    section.appendChild(this.img);
    section.appendChild(this.stop);
    //main要素を取得してsectionを入れる
    const main = document.querySelector('main');
    main.appendChild(section);
  }
  //spinのaddEventListenerの関数を作っていく
    //getRandomImage() imgをランダムに選ぶ
    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
    //spin()  一定時間ごとにimg.srcをランダムに表示するgetRandomImage()
    spin() {
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 70);
    this.img.src = this.getRandomImage();
    }
    //isUnmatchedメソッドを定義 imgがp１、p２と異なれば、trueを返す
    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }
    unmatch() {
      this.img.classList.add('unmatched');
    }
    activate() {
      this.stop.classList.remove('inactive');
      this.img.classList.remove('unmatched');
    }
}

//正誤判定 これはパネル全体に関わるので、classの外で行う checkResult
    //パネルの残りを定義
    let panelsLeft = 3;
    //checkResultを定義
function checkResult() {
  //１枚目のパネルが２枚目、３枚目と異なるなら、１枚目の色を薄くする
  //panels[]はclassだから、メソッドが使える
  if(panels[0].isUnmatched(panels[1], panels[2])){
    panels[0].unmatch();
  }
  //２枚目のパネルが１枚目、３枚目と異なるなら、２枚目の色を薄くする

  if(panels[1].isUnmatched(panels[0], panels[2])){
    panels[1].unmatch();
  }
  //３枚目のパネルが１枚目、２枚目と異なるなら、３枚目の色を薄くする

  if(panels[2].isUnmatched(panels[0], panels[1])){
    panels[2].unmatch();
  }
}

//panelsを定義（インスタンス）
const panels = [
  new Panel(),
  new Panel(),
  new Panel(),
];

//spinボタンの設定
const spin = document.getElementById('spin');
//addEventListener
spin.addEventListener('click', () =>{
  //spinボタンを押したときに、再度プログラムが走らないようにする。色を薄くする(inactive)。
  if (spin.classList.contains('inactive')) {
    return;
  }
  spin.classList.add('inactive');
  //panelsに対してそれぞれ、動作をつけていく
  panels.forEach(panel =>{
    //ゲーム終了後、spinボタンを押したら、panelのinactiveクラスを外すactivate())
    panel.activate();
    //panelのimgをランダムに表示する spin()
    panel.spin();
  });
});
}