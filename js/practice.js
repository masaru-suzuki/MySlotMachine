'use strict';
{
  class Panel {
    constructor() {
      this.section = document.createElement('section');
      this.section.classList.add('panel')
      this.img = document.createElement('img');
      this.getRandomImage();
      this.timeoutId = undefined;
      this.stop = document.createElement('div');
      this.stop.classList.add('stop');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive'))return;
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);
        stoppedPanel++;
        //if文のいちが間違っていた
        if (stoppedPanel === 3) {
          checkResult();
          inactive = false;
          stoppedPanel = 0;
        }
      });
      this.section.appendChild(this.img);
      this.section.appendChild(this.stop);
      const main = document.querySelector('main');
      main.appendChild(this.section);
    }
    getRandomImage() {
      this.img.src = images[Math.floor(Math.random() * images.length)];
    }
    spin() {
     this.timeoutId = setInterval(() => {
        this.getRandomImage();
      }, 70);
    }
    unmatch () {
      this.img.classList.add('unmatched');
    }
    activate() {
      this.stop.classList.remove('inactive');
      this.img.classList.remove('unmatched');
    }
  }
  let stoppedPanel = 0;
  let inactive = false;
  const images = [
    'img/seven.png',
    'img/cherry.png',
    'img/bell.png',
  ];

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  function checkResult () {
    if (panels[0].img.src !== panels[1].img.src && panels[0].img.src !== panels[2].img.src) {
      panels[0].unmatch()
    }
    if (panels[1].img.src !== panels[0].img.src && panels[1].img.src !== panels[2].img.src) {
      panels[1].unmatch()
    }
    if (panels[2].img.src !== panels[0].img.src && panels[2].img.src !== panels[1].img.src) {
      panels[2].unmatch()
    }
  }

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (inactive)return;
    inactive = true;
    //各パネルについて処理を行う
    panels.forEach(panel => {
      panel.spin();
      //activateを行う
      panel.activate();
    });
  });
    //section要素を作成 panel class
    //image要素を作成   /*'img/seven.png'とりあえずseven.pngとしておく→ランダムのimgに*/
    //div要素の作成 stop class
    //みやすさを重視してtimeoutIdはconstructorに定義
    //stopのeventListenerを設定
    //stopボタンを押したときに、再度プログラムが走らないようにする。色を薄くする(inactive)。
      //panelsLeftを1減らす
      //パネルを全部選び終えたら、正誤判定を行うcheckResult()
        //正誤判定が終わったら、もう一度spinボタンを押せるようにする
        //panelsLeftを初期値に戻す
    //sectionにimgとstopを入れる
    //main要素を取得してsectionを入れる
    //spinのaddEventListenerの関数を作っていく
      //getRandomImage() imgをランダムに選ぶ
      //spin()  一定時間ごとにimg.srcをランダムに表示するgetRandomImage()
    //isUnmatchedメソッドを定義 imgがp１、p２と異なれば、trueを返す

//正誤判定 これはパネル全体に関わるので、classの外で行う checkResult
    //パネルの残りを定義
    //checkResultを定義
  //１枚目のパネルが２枚目、３枚目と異なるなら、１枚目の色を薄くする
  //panels[]はclassだから、メソッドが使える
  //２枚目のパネルが１枚目、３枚目と異なるなら、２枚目の色を薄くする
  //３枚目のパネルが１枚目、２枚目と異なるなら、３枚目の色を薄くする
//panelsを定義（インスタンス）
//spinボタンの設定
//addEventListener
 //spinボタンを押したときに、再度プログラムが走らないようにする。色を薄くする(inactive)。
  //panelsに対してそれぞれ、動作をつけていく
    //ゲーム終了後、spinボタンを押したら、panelのinactiveクラスを外すactivate())
    //panelのimgをランダムに表示する spin()
}