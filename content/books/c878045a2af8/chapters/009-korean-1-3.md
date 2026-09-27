## 저자에 대해

제 이름은 [Kitty Giraudel](https://kittygiraudel.com/)이며, 2015년부터 베를린에 거주하고 있는 프랑스 출신의 프론트 엔드 개발자입니다. 현재 [N26](https://n26.com/)에서 근무하고 있습니다.

몇 년 동안 Sass를 써왔고 [SassDoc](http://sassdoc.com/), SitePoint Sass Reference, [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility//) 같은 Sass 관련 프로젝트의 저자입니다. Sass 커뮤니티에 대한 제 기여에 더 관심이 있으시면 [해당 목록](https://github.com/KittyGiraudel/awesome-sass)을 한 번 살펴보세요.

저는 [CSS3 Pratique du Design Web](https://www.eyrolles.com/Informatique/Livre/css3-9782212678963/) (_Eyrolles_ editions)이라는 제목의 (프랑스어로 된) CSS에 관한 책, [Jump Start Sass](https://learnable.com/books/jump-start-sass) (_Learnable_ editions)라는 제목의 (영어로 된) Sass에 관한 책을 쓰기도 했습니다.

[트위터에서 만나기](https://twitter.com/KittyGiraudel)

## 기여하기

Sass Guidelines는 남는 시간에 유지하는 무료 프로젝트입니다. 말할 것도 없이, 모든 최신정보를 반영하고, 기록하며, 관련성을 유지하는 것은 아주 많은 양의 일입니다. 감사하게도, 많은 훌륭한 기여자들로부터 도움을 받았습니다. 특히 많은 [다른 번역](#options-panel)을 유지 관리할 때 말이죠. 정말 감사합니다!

혹시 이 프로젝트에 기여하고 싶으시다면, 스타일가이드에 대해 트윗하고, 말을 퍼뜨리거나 [GitHub 저장소](https://github.com/KittyGiraudel/sass-guidelines)에서 이슈나 풀-리퀘스트를 통해 작은 오타를 수정해주시면 정말 좋을 거예요!

시작에 앞서 마지막으로: 이 문서를 즐기셨다면, 혹은 이 문서가 여러분이나 여러분의 팀에 유용하다면, 후원을 고려해주시기 바랍니다!

[Sass Guidelines 후원하기](https://gum.co/sass-guidelines) [입소문내기](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

[Sass](https://sass-lang.com/)는 [공식 문서](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)에서 스스로를 이렇게 묘사하고 있습니다:

> Sass는 기초 언어에 힘과 우아함을 더해주는 CSS의 확장이다.

Sass의 궁극적인 목적은 CSS의 결함을 보정하는 것입니다. 우리 모두 알듯이, CSS는 세계 최고의 언어는 못 됩니다\[citation needed\]. 배우기엔 매우 간단한 반면, 금세 아주 지저분해질 수 있습니다. 특히 큰 프로젝트에서 더 그렇습니다.

Sass는 이런 상황에서, 메타언어로서, 추가 기능과 유용한 도구를 제공하기 위해 CSS의 구문을 개선하는 역할을 합니다. 한편, Sass는 CSS 언어에 대해 보수적인 입장을 취하려 합니다.

핵심은 CSS를 완전한 기능을 갖춘 프로그래밍 언어로 바꾸지 않는 것입니다; Sass는 단지 CSS에서 부족한 부분만을 돕길 원합니다. 때문에, Sass를 시작하는 것은 CSS를 배우는 것보다 더 어려울 게 없습니다: CSS 위에 몇 가지의 추가 기능을 더할 뿐이니까요.

그렇다고는 하나, 이 기능들을 사용하는 데에는 많은 방법들이 있습니다. 좋은 것도 있고, 나쁜 것도, 예외적인 것도 있죠. 이 가이드라인은 여러분에게 Sass 코드 작성에 대한 일관되고, 기록된 접근법을 제공할 것입니다.

### Ruby Sass 혹은 LibSass

[Sass의 첫 번째 커밋](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe)은 8년 이상이 지난, 2006년 후반까지 거슬러 올라갑니다. 말할 것도 없이 그 이후로 아주 먼 길을 왔습니다. Ruby로 처음에 개발되었고, 여기저기서 다양한 포트들이 튀어나왔죠. 가장 성공적인, (C/C++로 쓰인) [LibSass](https://github.com/sass/libsass)는 현재 원래의 Ruby 버전과의 완전한 호환에 근접해 있습니다.

2014년, [Ruby 사스와 LibSass 팀은 더 나아가기 전에 두 가지 버전의 동기화를 기다리기로 결정했습니다](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). 그 이후로, LibSass는 형제와의 기능 동기화를 위해 활발하게 버전들을 출시하고 있습니다. 남아있는 불일치들은 제가 [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility//) 프로젝트로 한데 모아 정리해두었습니다. 열거되지 않은 불일치를 알고 계신다면, 이슈를 여는 친절을 베풀어주시기 바랍니다.

여러분의 컴파일러를 선택하는 것으로 돌아가겠습니다. 사실, 이건 여러분의 프로젝트에 달려있습니다. Ruby on Rails 프로젝트라면, Ruby Sass를 사용하는 게 나을 겁니다. Ruby Sass가 이 경우에 완벽하게 적합하죠. 또한, Ruby Sass가 언제나 참조 구현이 될 것이며 기능에 있어 LibSass를 선도할 것이라는 점을 알아두십시오. 그리고 만약 [Ruby Sass에서 LibSass로 바꾸기](https://www.sitepoint.com/switching-ruby-sass-libsass/)를 원한다면, 이 글은 당신을 위한 것입니다.

작업 흐름의 통합이 필요한 비(非)Ruby 프로젝트의 경우, 주로 감싸는 용도로 만들어져 있으므로 LibSass가 아마도 더 나은 생각일 것입니다. 그러니까 만약 Node.js를 사용하고 싶으시다면, 선택은 [node-sass](https://github.com/sass/node-sass)입니다.

### Sass 혹은 SCSS

_Sass_라는 이름의 의미에 관해 꽤 많은 혼동이 있습니다. 그럴 만한 이유가 있죠: Sass는 전처리기와 그 구문 두 가지를 의미합니다. 좀 불편하죠, 안 그런가요?

Sass는 처음에 들여쓰기의 감지를 그 핵심 특성으로 갖는 구문을 가리켰습니다. 얼마 지나지 않아, Sass를 유지하는 사람들은 _Sassy CSS_를 의미하는 _SCSS_라는 CSS 친화적인 구문을 제공함으로써 Sass와 CSS 사이의 차이를 좁히기로 결정했습니다. 모토는 이렇습니다: 만약 유효한 CSS라면, 유효한 SCSS이다.

그 이후로, Sass(전처리기)는 [두 가지 다른 구문](https://www.sitepoint.com/whats-difference-sass-scss/)을 제공해 오고 있습니다: _들여쓰기 구문_으로도 알려진 Sass(전부 대문자가 아닙니다, [제발](http://sassnotsass.com/)), 그리고 SCSS. 둘은 정확히 동등한 기능을 갖고 있기 때문에 어느 것을 사용할지는 여러분에게 달렸습니다. 지금 시점에서는 이것은 순전히 미관상의 문제입니다.

Sass의 공백에 반응하는 구문은 중괄호, 세미콜론 그리고 다른 구두점 기호들을 없애기 위해 들여쓰기에 의존하며, 이는 간결하고 짧은 구문으로 이어집니다. 한편, SCSS는 주로 CSS에 올려진 작은 추가사항들이므로 배우기에 더 쉽습니다.

저 자신은 CSS와 더 비슷하고 대부분의 개발자들에게 더 친숙하기 때문에 SCSS를 Sass보다 더 선호합니다. 그런 이유로, SCSS가 이 가이드라인의 기본 구문입니다. 에서 Sass의 들여쓰기 구문으로 바꾸실 수 있습니다.

### 기타 전처리기들

Sass 외에도 여러 전처리기가 있습니다. 가장 만만찮은 경쟁자는 [Less](http://lesscss.org/)일 것입니다. 유명한 CSS 프레임워크인 [Bootstrap](https://getbootstrap.com/)이 (버전 4까지) 사용한 덕분에 널리 알려진 Node.js 기반의 전처리기죠. 또한 [Stylus](https://stylus-lang.com/)라는 매우 관대하고 유연한 전처리가 있지만, 사용하기가 조금 더 어렵고 커뮤니티가 작습니다.

_다른 전처리기를 두고 왜 Sass를 선택하는가?_ 오늘날에도 여전히 합당한 질문입니다. 얼마 전까진, Sass가 애초에 Ruby로 만들어졌고 Ruby on Rails와 함께 잘 작동했기 때문에 Ruby 기반의 프로젝트에 Sass를 추천하곤 했습니다. 이제 LibSass가 오리지널 Sass를 (거의) 따라잡았기 때문에, 이건 더이상 적절한 조언이 아닙니다.

제가 Sass에서 좋아하는 점은 CSS에 대한 보수적인 접근입니다. Sass의 디자인은 강력한 원칙에 기반하고 있습니다: 디자인 접근법의 큰 부분은 다음과 같은 중심 팀의 믿음으로부터 나옵니다. a) 추가 기능을 더하는 것은 유용성에 의해 정당화되어야만 하는 복잡성의 비용을 가진다. b) 따로 떨어져 있는 스타일 블록 하나만을 보는 것으로도 주어진 블록이 무엇을 하고 있는지 추론하는 것이 쉬워야 한다. 또한, Sass는 다른 전처리기에 비해 세부사항에 대한 훨씬 날카로운 관심을 갖고 있습니다. 제가 아는 한, 핵심 디자이너들은 간과하기 쉬운 모든 CSS 호환성에 대한 지원까지 신경 쓰고 전반적인 동작들이 모두 일관성을 유지하도록 합니다. 다시 말해서, Sass는 실제의 문제를 해결하고, CSS가 미흡한 지점에서 CSS에 유용한 기능을 제공하는 것을 돕기 위한 소프트웨어입니다.

전처리기 외에도, 우리는 [PostCSS](https://github.com/postcss/postcss)와 [cssnext](https://cssnext.github.io/) 같은 도구도 언급해야 합니다. 이들은 지난 몇 달 동안 상당한 관심을 받았죠.

PostCSS는 일반적으로 (그리고 잘못) “후처리기”라고 합니다. 가정해보면, 불행한 이름과 결합한 PostCSS는 이미 전처리기에 의해 처리된 CSS를 파싱한다는 것입니다. 이러한 방식으로 작동 할 수도 있지만, 필수 사항은 아니므로 PostCSS는 실제로 “프로세서”일 뿐입니다.

PostCSS는 스타일시트의 “토큰”에 접근할 수 있게 해주고(예 : 선택자, 속성 및 값), JavaScript로 그것들을 처리하여 모든 종류의 조작을 수행하고 그 결과를 CSS에 컴파일합니다. 예를 들어, 유명한 접두사 라이브러리 [Autoprefixer](https://github.com/postcss/autoprefixer)는 PostCSS로 빌드됩니다. 브라우저 지원 도구 [CanIUse](https://caniuse.com/)를 참조하여 벤더 프리픽스가 필요한지 확인하기 위해 모든 규칙을 파싱한 다음 벤더 프리픽스를 제거하고 필요한 것은 추가합니다.

PostCSS는 모든 전 처리기 (바닐라 CSS 포함)와 함께 작동하는 라이브러리를 구축하는 데 매우 강력하고 훌륭하지만, 아직 사용하기가 특별히 쉽지 않습니다. 그것으로 무엇이든 빌드하기 위해서는 JavaScript를 조금 알아야하며, API가 가끔 혼란스러울 수 있습니다. Sass는 CSS를 작성에 유용한 기능만 제공하는 반면, PostCSS는 CSS AST(추상 구문 트리)와 JavaScript에 대한 직접 접근을 제공합니다.

간단히 말해서, Sass는 다소 쉬우며 대부분의 문제를 해결할 것입니다. 반면에, PostCSS는 (JavaScript에 능숙하지 않다면) 손에 넣기 어려울 수 있지만, 믿을 수 없을 정도로 강력합니다. 둘 다 사용하지 않을 이유가 없습니다. 사실, PostCSS는 이를 위해 공식적인 SCSS 파서를 제공합니다.

## 서론

### 왜 스타일가이드가 필요한가

스타일가이드는 여러분의 코드에 대한 이상적인 상태를 제시하는 그저 읽기에 즐거운 문서가 아닙니다. 어떻게 그리고 왜 코드가 쓰여야 하는지를 묘사하는, 프로젝트의 일생에서 핵심이 되는 문서입니다. 작은 프로젝트에서는 이것이 지나친 노력으로 보일 수 있습니다. 하지만 코드베이스를 깔끔하고 확장 가능하며 쉽게 관리할 수 있도록 유지하는 데 큰 도움이 됩니다.

말할 것도 없이, 더 많은 개발자들이 프로젝트에 참여할수록, 더 많은 코드 가이드라인이 필요합니다. 같은 맥락으로, 프로젝트가 클수록 스타일가이드는 더욱 필수품이 됩니다.

[Harry Roberts](https://csswizardry.com/)는 [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide)에서 이에 대해 잘 서술하고 있습니다:

> 코딩 스타일가이드는 (시각적 스타일가이드 아님) 다음과 같은 팀을 위한 소중한 도구이다:
> 
> -   상당 기간 동안 제품을 제작하고 유지하는 팀;
> -   다른 능력과 특기를 소유한 개발자들이 있는 팀;
> -   어느 때나 작업을 진행하고 있는 여러 명의 다른 개발자들이 있는 팀;
> -   정기적으로 직원을 충원하는 팀;
> -   개발자들이 들락날락하는 다수의 코드베이스를 가진 팀.

### 이 글에서 기대하지 말아야 할 것

중요한 것 먼저: **이것은 CSS 스타일가이드가 아닙니다**. 이 문서는 CSS 클래스를 위한 작명 관례, 모듈 패턴과 CSS 세계에서의 ID 문제를 논하지 않을 것입니다. 이 가이드라인은 오직 Sass와 관련된 내용만을 다루는 것을 목표로 합니다.

또한, 이 가이드라인은 제 자신의 것이고 따라서 **매우 치우친 견해를 갖고 있습니다**. 방법론 모음집이나 제가 수년 동안 다듬고 해 온 조언이라고 생각하세요. 이 가이드라인은 몇몇 통찰력 있는 자료를 연결할 기회 또한 제공하니, _참고 자료_ 역시 꼭 확인하세요.

누구나 동의하다시피, 이것이 유일한 방법은 아니며, 여러분의 프로젝트에 맞을 수도 맞지 않을 수도 있습니다. 마음대로 골라서 여러분의 필요에 맞게 적용하세요. 우리가 이야기하듯이, _여러분 자동차의 연비는 다를 수 있습니다_(역주: 상황에 따라 다르게 적용될 수 있습니다).

### 핵심 원칙

마지막에 가서, 여러분이 이 스타일가이드 전체로부터 얻기를 바라는 한 가지가 있다면, 그것은 **Sass는 가능한 한 간단하게 유지되어야 한다**는 것입니다.

Sass로 쓰인 [bitwise operators](https://github.com/KittyGiraudel/SassyBitwise), [iterators and generators](https://github.com/KittyGiraudel/SassyIteratorsGenerators), [a JSON parser](https://github.com/KittyGiraudel/SassyJSON) 등 저의 실없는 실험들 덕분에 우리는 이 전처리기를 가지고 어떤 일을 할 수 있는지 잘 알고 있습니다.

한편, CSS는 간단한 언어입니다. Sass는 CSS를 작성하도록 의도되었으므로, 보통의 CSS보다 더 복잡해져선 안 됩니다. [KISS 원칙](https://en.wikipedia.org/wiki/KISS_principle)(Keep It Simple Stupid)이 핵심이며 어떤 상황에선 심지어 [DRY 원칙](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)(Don’t Repeat Yourself)보다 우선할 수도 있습니다.

때로는, 코드를 유지가능하도록 만들기 위해 조금 반복하는 편이 더 낫습니다. 무거운 머리를 가진, 통제하기 힘들고, 불필요하게 복잡한 시스템을 제작하면 지나친 복잡성 때문에 유지관리가 완전히 불가능해질 수 있습니다.

또한, 한 번 더 [Harry Roberts](https://csswizardry.com/)를 인용하자면, **실용주의가 완벽을 이깁니다**. 어느 순간, 아마도 여러분은 여기에 설명된 규칙을 거스르는 스스로를 발견하실 겁니다. 만약 그것이 타당하다면, 만약 그것이 옳게 느껴진다면, 그렇게 하세요. 코드는 목적이 아니라 수단에 불과합니다.

### 가이드라인 확장하기

이 스타일 가이드의 많은 부분이 상당히 주관적입니다. 저는 몇 년 동안 Sass를 읽고 쓰고 있으며, 지금은 깔끔한 스타일 시트를 작성할 때 많은 원칙을 가지고 있습니다. 저는 그것이 모두를 만족시키지도 않을 수도 있고, 모두에게 어울리지 않을 수도 있다는 것을 이해합니다. 이것은 지극히 정상적인 것입니다.

하지만, 저는 이 스타일가이드가 확장되어야 한다고 생각합니다. Sass 가이드라인을 확장하는 것은 코드가 몇 가지 사항을 제외하고 이 스타일 가이드의 지침을 따르고 있음을 나타내는 문서를 작성하는 것만큼 간단 할 수 있습니다. 몇 가지 경우를 제외하면 말이죠. 그 경우의 구체적인 규칙은 아래에 설명되어 있습니다.

스타일가이드의 확장 예는 [SassDoc 저장소](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md)에서 찾을 수 있습니다:

> 이것은 Felix Geisendörfer의 Node 스타일가이드의 확장입니다. 이 문서의 모든 내용은 Node 스타일가이드에서 언급될 수 있는 내용보다 우선합니다.

## 구문 & 서식

제 생각으로는, 스타일가이드가 가장 먼저 해야 할 일은 우리 코드가 어떻게 보이길 원하는지를 묘사하는 것입니다.

같은 프로젝트에서 여러 명의 개발자들이 CSS 작성에 참여할 때, 그들 중 하나가 자기만의 방식으로 일을 하기 시작하는 것은 시간 문제일 뿐입니다. 일관성을 고취하는 코드 가이드라인은 이것을 방지할 뿐만 아니라, 코드를 읽고 업데이트하는 데에도 도움을 줍니다.

대략, 우리가 원하는 것은 (뻔뻔스럽게도 [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)에서 영감을 얻은) 다음과 같습니다:

-   탭 대신 스페이스 두 칸 (2) 들여쓰기;
-   이상적인 행의 너비는 80글자;
-   적절하게 쓰인 여러 행의 CSS 규칙;
-   공백의 의미 있는 사용.

```
// Yep
.foo {
  display: block;
  overflow: hidden;
  padding: 0 1em;
}

// Nope
.foo {
    display: block; overflow: hidden;

    padding: 0 1em;
}
```

```
// Sass 들여쓰기 구문은 위의 코딩 기준을 강제하기 때문에 잘못된 방식으로 처리할
// 수 없습니다
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

### 문자열

믿거나 말거나, 문자열은 CSS와 Sass 생태계에서 꽤 중요한 역할을 합니다. 대부분의 CSS 값들은 길이 혹은 식별자이기 때문에, Sass에서 문자열을 다룰 때는 어느 정도 가이드라인을 따르는 것이 사실 제법 중요합니다.

#### 인코딩

문자 인코딩과 관련한 잠재적인 문제를 피하기 위해서는, [메인 스타일시트](#main-)에서 `@charset` 지시어를 사용해 [UTF-8](https://ko.wikipedia.org/wiki/UTF-8) 인코딩을 강제하는 것이 강력하게 권장됩니다. 이 지시어가 스타일시트의 가장 첫 번째 요소이고 어트 종류의 문자도 앞에 오지 않도록 하세요.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### 따옴표

CSS에서 문자열은 따옴표로 둘러싸일 필요가 없습니다. 심지어 공백을 포함한 경우에도요. 예를 들면 font-family가 있습니다: 따옴표로 감쌌는지 여부는 CSS 파서에게 문제가 되지 않습니다.

이 때문에, Sass _역시_ 문자열이 따옴표로 둘러싸일 것을 요구하지 않습니다. 더 나아가 (그리고 여러분도 인정하듯이, 운이 좋게도) 따옴표로 둘러싸인 문자열은 그렇지 않은 쌍둥이와 정확히 동일합니다(예를 들면 `'abc'`는 `abc`와 정확히 동일합니다).

그렇기는 하나, 문자열이 따옴표에 둘러싸일 것을 요구하지 않는 언어들은 분명히 소수이고 따라서, Sass에서 **문자열은 언제나 작은따옴표(`'`)로 감싸져야 합니다**(_qwerty_ 자판에서 작은따옴표가 큰따옴표보다 입력하기 쉬우므로). CSS의 사촌 JavaScript를 포함한 다른 언어와의 일관성 외에도, 이 선택에 대한 몇 가지 이유가 있습니다:

-   색 이름은 따옴표가 없으면 색으로 취급되는데, 이는 심각한 문제로 이어질 수 있다;
-   대부분의 구문 강조기는 따옴표 없는 문자열을 지원하지 못할 것이다;
-   전반적인 가독성에 도움이 된다;
-   문자열을 따옴표로 감싸지 않을 적절한 이유가 없다.

```
// Yep
$direction: 'left';

// Nope
$direction: left;
```

```
// Yep
$direction: 'left'

// Nope
$direction: left
```

CSS 규격에 따라, `@charset` 지시어는 [유효하다고 간주되도록](https://www.w3.org/TR/css3-syntax/#charset-rule) 큰따옴표로 선언되어야 합니다. 그러나, Sass는 CSS로 컴파일할 때 이 문제를 처리하므로 최종 결과에 영향을 미치지 않습니다. `@charset`의 경우에도 작은따옴표를 안전하게 사용할 수 있습니다.

#### CSS 값인 문자열

`initial`이나 `sans-serif` 같은 특정 CSS 값은 따옴표로 싸여서는 안 됩니다. `font-family: 'sans-serif'` 같은 선언의 경우 CSS는 인용부호가 붙은 문자열이 아니라 식별자를 기대하고 있기 때문에 아무 경고도 없이 작동하지 않을 것입니다. 이 때문에, 그런 값들은 따옴표로 감싸지 않습니다.

```
// Yep
$font-type: sans-serif;

// Nope
$font-type: 'sans-serif';

// Okay I guess
$font-type: unquote('sans-serif');
```

```
// Yep
$font-type: sans-serif

// Nope
$font-type: 'sans-serif'

// Okay I guess
$font-type: unquote('sans-serif')
```

따라서, 우리는 앞의 예처럼 CSS 값(CSS 식별자)으로 사용될 문자열과 맵 키와 같은 Sass 자료 유형에 쓰일 문자열을 구별할 수 있습니다.

전자에는 따옴표를 붙이지 않지만, 후자는 작은따옴표로 감쌉니다.

#### 따옴표를 포함한 문자열

만약 문자열이 하나 혹은 여러 개의 작은따옴표를 포함하고 있다면, 문자열 안에서 과도한 문자 이스케이프를 피하기 위해 대신 큰따옴표(`"`)로 문자열을 감싸는 것을 고려해볼 수 있습니다.

```
// Okay
@warn 'You can\'t do that.';

// Okay
@warn "You can't do that.";
```

```
// Okay
@warn 'You can\'t do that.'

// Okay
@warn "You can't do that."
```

#### URL

URL 역시 위와 동일한 이유로 따옴표로 감싸져야 합니다:

```
// Yep
.foo {
  background-image: url('/images/kittens.jpg');
}

// Nope
.foo {
  background-image: url(/images/kittens.jpg);
}
```

```
// Yep
.foo
  background-image: url('/images/kittens.jpg')

// Nope
.foo
  background-image: url(/images/kittens.jpg)
```

### 숫자

Sass에서 숫자는 단위가 없는 숫자에서부터 길이, 기간, 빈도, 각도 등에 이르기까지 모든 것을 포함하는 데이터 타입입니다. 덕분에 그런 단위들을 가지고 연산을 하는 것이 가능해집니다.

#### 0(영)

숫자는 1보다 작은 소수 앞에 앞장서는 0을 표기해야 합니다. 뒤따르는 0은 절대 표기하지 마세요.

```
// Yep
.foo {
  padding: 2em;
  opacity: 0.5;
}

// Nope
.foo {
  padding: 2.0em;
  opacity: .5;
}
```

```
// Yep
.foo
  padding: 2em
  opacity: 0.5

// Nope
.foo
  padding: 2.0em
  opacity: .5
```

Sublime Text와 정규식 기반 검색 및 교체를 제공하는 다른 편집기에서는 (전부는 아니지만 대부분) 부동 숫자에 선행 0을 추가하는 것이 매우 쉽습니다. `\s+\.(\d+)`를`\ 0.$1`로 바꾸기만 하면 됩니다. 그러나 `0` 앞에 띄어쓰기하는 것을 잊지 마세요.

#### 단위

길이를 다룰 때, `0` 값은 절대로 단위를 가져선 안 됩니다.

```
// Yep
$length: 0;

// Nope
$length: 0em;
```

```
// Yep
$length: 0

// Nope
$length: 0em
```

조심하세요. 이 관행은 길이에만 국한되어야 합니다. `transition-delay`와 같은 시간 속성에는 단위 없는 0이 허용되지 않습니다. 이론적으로 지속 시간 동안 단위 없는 0이 지정되면 선언은 유효하지 않은 것으로 간주하여 폐기되어야 합니다. 모든 브라우저가 그렇게 엄격하지는 않지만, 일부는 그렇습니다. 간단히 말해서: 길이 단위만 생략하세요.

Sass에서 숫자와 관련해 제가 생각할 수 있는 가장 흔한 실수는 단위가 숫자에 안전하게 덧붙여질 수 있는 문자열이라고 생각하는 것입니다. 이게 그럴 듯하게 들리긴 하지만, 단위가 작동하는 방식은 분명히 아닙니다. 단위를 대수 기호라고 생각해보세요. 예를 들어 실제 세계에서, 5인치에 5인치를 곱하면 25 제곱 인치가 나옵니다. 똑같은 논리가 Sass에도 적용됩니다.

단위를 숫자에 붙이기 위해서는, 이 숫자에 _1 단위_를 곱해야 합니다.

```
$value: 42;

// Yep
$length: $value * 1px;

// Nope
$length: $value + px;
```

```
$value: 42

// Yep
$length: $value * 1px

// Nope
$length: $value + px
```

_0 단위_를 더하는 것도 역시 같은 결과를 내긴 하지만, _0 단위_를 더하는 것은 약간 혼란스러울 수 있기 때문에 앞서 언급한 방법을 추천합니다. 사실, 숫자를 다른 호환되는 단위로 변환하려고 할 때, 0을 더하는 것은 효과가 없습니다. [이 글](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/)에서 더 알아볼 수 있습니다.

```
$value: 42 + 0px;
// -> 42px

$value: 1in + 0px;
// -> 1in

$value: 0px + 1in;
// -> 96px
```

```
$value: 42 + 0px
// -> 42px

$value: 1in + 0px
// -> 1in

$value: 0px + 1in
// -> 96px
```

결국에는, 여러분이 달성하려고 하는 것이 무엇인지에 달려있습니다. 단위를 문자열로서 더하는 것은 좋은 방법이 아니라는 점을 명심하세요.

값의 단위를 제거하기 위해서는, _그 종류의 한 단위_로 나누어야 합니다.

```
$length: 42px;

// Yep
$value: $length / 1px;

// Nope
$value: str-slice($length + unquote(''), 1, 2);
```

```
$length: 42px

// Yep
$value: $length / 1px

// Nope
$value: str-slice($length + unquote(''), 1, 2)
```

단위를 문자열로서 숫자에 덧붙이면 결과물은 문자열이 되며, 그 값으로 더이상 연산을 할 수 없습니다. 숫자의 숫자 부분을 단위에서 잘라내면 그 결과 역시 문자열이 됩니다. 이것은 여러분이 원하는 것이 아닙니다.

#### 연산

**최상위 숫자 계산은 언제나 괄호로 감싸져야 합니다**. 이 요건은 가독성을 향상할 뿐만 아니라, Sass가 괄호 안의 수치를 계산하도록 강제함으로써 일부 예외적인 상황을 방지합니다.

```
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

```
// Yep
.foo
  width: (100% / 3)

// Nope
.foo
  width: 100% / 3
```

#### 매직 넘버

“매직 넘버”는 _익명의 숫자 상수_를 일컫는 [전통적인 프로그래밍 용어](https://en.wikipedia.org/wiki/Magic_number_\(programming\)#Unnamed_numerical_constants)입니다. 기본적으로, 이 숫자는 어쩌다 보니 _맞아떨어지지만_™ 어떤 논리적인 설명과도 관련되지 않은 임의의 숫자입니다.

말할 것도 없이 **매직 넘버는 역병 같은 존재이며 무슨 수를 써서라도 피해야 합니다**. 왜 매직넘버가 효과를 내는지에 대한 합리적인 설명을 찾을 수 없을 때는, 어떻게 거기에 도달했고 왜 효과를 낸다고 생각하는지를 설명하는 충분한 주석을 달아놓으세요. 무언가가 제대로 작동하는 이유를 모른다고 인정하는 것이 그래도 아무런 사전 정보 없이 알아내게 하는 것보다 다음 개발자에게 더 도움이 됩니다.

```
/**
 * 1. 매직 넘버. `.foo`의 상단을 부모에 맞춰 정렬시키기 위해 찾은 값 중 가장
 * 낮은 값이다. 가능하다면, 적절하게 고쳐야 할 것.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. 매직 넘버. `.foo`의 상단을 부모에 맞춰 정렬시키기 위해 찾은 값 중 가장
 * 낮은 값이다. 가능하다면, 적절하게 고쳐야 할 것.
 */
.foo
  top: 0.327em /* 1 */
```

주제에 대해 CSS-Tricks에 CSS의 매직 넘버에 관한 [훌륭한 글](https://css-tricks.com/magic-numbers-in-css/)이 있는데, 한 번 읽어 보시길 권장합니다.

### 색

색은 CSS 언어에서 중요한 위치를 차지하고 있습니다. 자연스럽게, Sass는 몇 가지의 [강력한 함수](https://sass-lang.com/documentation/Sass/Script/Functions.html)을 제공함으로써 색 조작에 있어 소중한 동맹이 되었습니다.

Sass는 색을 조작할 때 매우 유용하여 이 주제에 대한 글이 인터넷 전체에서 번성했습니다. 몇 가지 글을 추천하겠습니다:

-   [프로그래밍 방식으로 한 색에서 다른 색으로 전환하는 방법](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Sass를 사용하여 색상표 만들기](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Sass에서 색 구성표 다루기](https://www.sitepoint.com/dealing-color-schemes-sass/)

#### 색 서식

색을 가능한 한 간단하게 만들기 위한 제 조언은 색 서식에 대한 다음의 우선순위를 따르라는 것입니다:

1.  [HSL 표기법](https://en.wikipedia.org/wiki/HSL_and_HSV);
2.  [RGB 표기법](https://en.wikipedia.org/wiki/RGB_color_model);
3.  16진수 표기법. 가급적 소문자와 가능한 경우 단축형으로.

CSS 색 키워드는 빠르게 프로토타입을 제작하는 게 아니라면 사용해서는 안 됩니다. 실제로, 그것들은 영어 단어이며 그들 중 일부는 특히 비원어민 사용자들에게 그들이 나타내는 색을 설명하는 데 꽤 나쁩니다. 게다가 키워드는 완벽하게 시맨틱하지 않습니다. 예를 들어 `grey`는 실제로 `darkgrey`보다 어둡고, `grey`와 `gray` 사이의 혼동은 이 색의 일관성 없는 사용으로 이어질 수 있습니다.

HSL 표기는 인간의 두뇌로 이해하기에 가장 쉬울 뿐만 아니라\[citation needed\], 스타일시트 작성자가 색, 채도, 명도를 조정함으로써 색을 변경하는 일을 쉽게 만듭니다.

RGB 역시 색이 청색, 녹색, 적색 중 어느 것에 가까운지 바로 보여주는 이점을 갖고 있습니다. 따라서 일부 상황에서는 특히 순수한 적색, 녹색 또는 청색을 설명할 때 HSL보다 나을 수 있습니다. 세 부분으로 색을 만드는 것이 쉽지는 않지만 말이죠.

마지막으로, 16진수 표기법은 인간의 머리로는 거의 해독이 불가능합니다. 필요하다면 최후의 수단으로만 쓰세요.

```
// Yep
.foo {
  color: hsl(0, 100%, 50%);
}

// Also yep
.foo {
  color: rgb(255, 0, 0);
}

// Meh
.foo {
  color: #f00;
}

// Nope
.foo {
  color: #FF0000;
}

// Nope
.foo {
  color: red;
}
```

```
.foo
  color: hsl(0, 100%, 50%)

// Also yep
.foo
  color: rgb(255, 0, 0)

// Nope
.foo
  color: #f00

// Nope
.foo
  color: #FF0000

// Nope
.foo
  color: red
```

HSL이나 RGB 표기를 사용할 때, 쉼표(`,`) 뒤에는 언제나 스페이스 한 칸을 더하고 괄호(`(`, `)`)와 내용 사이에는 스페이스를 넣지 마세요.

```
// Yep
.foo {
  color: rgba(0, 0, 0, 0.1);
  background: hsl(300, 100%, 100%);
}

// Nope
.foo {
  color: rgba(0,0,0,0.1);
  background: hsl( 300, 100%, 100% );
}
```

```
// Yep
.foo
  color: rgba(0, 0, 0, 0.1)
  background: hsl(300, 100%, 100%)

// Nope
.foo
  color: rgba(0,0,0,0.1)
  background: hsl( 300, 100%, 100% )
```

#### 색과 변수

색을 한 번 이상 사용할 때는 색을 대변하는 의미 있는 이름을 붙여 변수에 저장하세요.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

이제 이 변수를 언제든 원할 때마다 자유롭게 사용할 수 있습니다. 하지만, 만약 변수의 용도가 테마와 깊은 관련이 있다면, 변수를 그대로 사용하지 말라고 조언하겠습니다. 대신, 그 변수가 어떻게 사용되어야 하는지 설명하는 이름을 붙여 다른 변수에 저장하세요.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

이렇게 함으로써 테마 변경이 `$sass-pink: blue` 같은 사태를 초래하는 것을 방지할 수 있습니다. [이 글](https://davidwalsh.name/sass-color-variables-dont-suck)은 색 변수를 끝까지 생각하는 것이 왜 중요한지를 잘 설명해 줍니다.

#### 색 명암 조절

[`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method)과 [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) 두 함수는 HSL 공간에서 색의 명도를 증감하여 조정합니다. 기본적으로, 이들은 [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) 함수의 `$lightness` 매개변수의 가명일 뿐입니다.

문제는, 이들 함수가 가끔 기대되는 결과를 제공하지 않는다는 것입니다. 반면에, [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) 함수는 색을 `white`나 `black`과 혼합함으로써 명암을 조절하는 좋은 방법입니다.

앞서 언급한 두 함수보다 `mix`를 사용하는 것의 이점은 색의 비율을 감소시킴에 따라 점진적으로 검은 색(혹은 흰 색)으로 나아간다는 점입니다. 반면 `darken`과 `lighten`은 색을 순식간에 완전한 검은 색이나 흰 색으로 보내버릴 것입니다.

  

`lighten`/`darken` 과 `mix` 사이의 차이를 보여주는 삽화 by [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

만약 매번 `mix` 함수를 쓰는 것을 원치 않으신다면, 두 가지 사용하기 쉬운 ([Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)에 포함되어 있기도 한) `tint`와 `shade` 함수를 만들어 같은 일을 할 수 있습니다:

```
/// 색을 약간 밝게 한다
/// @access public
/// @param {Color} $color - 밝게 만들려는 색
/// @param {Number} $percentage - 반환될 색 내 `$color`의 백분율
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// 색을 약간 어둡게 한다
/// @access public
/// @param {Color} $color - 어둡게 만들려는 색
/// @param {Number} $percentage - 반환될 색 내 `$color`의 백분율
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

```
/// 색을 약간 밝게 한다
/// @access public
/// @param {Color} $color - 밝게 만들려는 색
/// @param {Number} $percentage - 반환될 색 내 `$color`의 백분율
/// @return {Color}
@function tint($color, $percentage)
  @return mix($color, white, $percentage)

/// 색을 약간 어둡게 한다
/// @access public
/// @param {Color} $color - 어둡게 만들려는 색
/// @param {Number} $percentage - 반환될 색 내 `$color`의 백분율
/// @return {Color}
@function shade($color, $percentage)
  @return mix($color, black, $percentage)
```

[`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) 함수는 속성들이 이미 얼마나 높거나 낮은지를 고려함으로써 그 크기를 보다 유동적으로 변경하도록 디자인되었습니다. 이 함수는 `mix` 만큼이나 좋은 결과물과 함께 보다 명확한 호출 관례를 제공합니다. 그렇지만 비례 계수는 정확히 같지 않습니다.

### 리스트

리스트는 Sass에서 배열에 해당하는 개념입니다. 리스트는 어떤 타입의 값이든(리스트도 포함. 이 경우 내포 리스트가 된다) 저장할 수 있게 의도된 ([맵](#maps))과 달리) 평면적인 데이터 구조입니다.

리스트는 다음의 가이드라인을 준수해야 합니다:

-   한 줄 혹은 여러 줄;
-   80자 줄에 안 들어갈 정도로 길면 반드시 여러 줄에 표기한다;
-   CSS 상에서 그대로 사용되지 않는 한, 언제나 쉼표로 분리한다;
-   언제나 괄호로 감싼다;
-   여러 줄인 경우 뒤따르는 쉼표를 붙이고, 한 줄인 경우 제외한다.

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif);

// Yep
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
);

// Nope
$font-stack: 'Helvetica' 'Arial' sans-serif;

// Nope
$font-stack: 'Helvetica', 'Arial', sans-serif;

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif,);
```

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif)

// Nope (not supported)
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
)

// Nope
$font-stack: 'Helvetica' 'Arial' sans-serif

// Nope
$font-stack: 'Helvetica', 'Arial', sans-serif

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif,)
```

리스트에 새로운 아이템을 추가할 때는, 언제나 제공된 API를 이용하세요. 수동으로 새로운 아이템을 추가하려고 하지 마세요.

```
$shadows: (0 42px 13.37px hotpink);

// Yep
$shadows: append($shadows, $shadow, comma);

// Nope
$shadows: $shadows, $shadow;
```

```
$shadows: (0 42px 13.37px hotpink)

// Yep
$shadows: append($shadows, $shadow, comma)

// Nope
$shadows: $shadows, $shadow
```

[이 글](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/)에서 저는 Sass에서 리스트를 올바르게 처리하고 조작하기 위한 많은 트릭과 팁을 살펴봅니다.

### 맵

Sass를 사용하여 스타일시트 작성자는 맵을 정의할 수 있는데, 이는 연관 배열, 해쉬 혹은 JavaScript 오브젝트에 해당하는 Sass 용어입니다. 맵은 키를 모든 유형의 값과 연결하는 자료 구조입니다. 제정신을 위해서라면 복잡한 데이터 유형을 맵의 키로 사용하는 것을 권장하지는 않지만, 키와 값 모두 맵을 포함한 어떤 데이터 유형일 수는 있습니다.

맵은 다음과 같이 작성되어야 합니다:

-   콜론(`:`) 다음에 스페이스;
-   여는 괄호 (`(`)는 콜론(`:`)과 같은 줄에;
-   (99%의 경우에 해당하는) 문자열인 **키는 따옴표로 감싼다**;
-   각각의 키/값 쌍은 새 줄을 차지한다;
-   각 키/값 뒤에는 쉼표(`,`);
-   추가, 제거 혹은 순서를 바꾸기 쉽도록 마지막 아이템 **뒤에 따라오는 쉼표**(`,`);
-   닫는 괄호(`)`)는 새 줄을 차지한다;
-   닫는 괄호(`)`)와 세미콜론(`;`) 사이에는 스페이스나 새 줄을 넣지 않는다.

보기:

```
// Yep
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
);

// Nope
$breakpoints: ( small: 767px, medium: 992px, large: 1200px );
```

```
// Yep
$breakpoints: ('small': 767px, 'medium': 992px, 'large': 1200px,)

// Nope
$breakpoints: ( 'small': 767px, 'medium': 992px, 'large': 1200px )

// Nope
$breakpoints: (small: 767px, medium: 992px, large: 1200px,)

// Nope (since it is not supported)
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
)
```

Sass 맵에 대한 글은 이 기능이 얼마나 갈망 되었는지를 보여줄 때가 많습니다. 제가 추천하는 3가지는: [Sass 맵 사용하기](https://www.sitepoint.com/using-sass-maps/), [Sass 맵의 추가 기능](https://www.sitepoint.com/extra-map-functions-sass/), [진짜 Sass, 진짜 맵](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/)입니다.

### CSS 규칙

이 부분은 모두가 알고 있는 내용의 복습이 되겠지만, 여기 CSS 규칙의 작성 방법이 있습니다. (적어도, [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)을 포함한 대부분의 가이드라인에 따르면 이렇습니다):

-   관련된 선택자는 같은 줄에; 관련 없는 선택자는 새 줄에;
-   여는 중괄호(`{`)는 마지막 선택자와 스페이스 한 칸의 간격을 둔다;
-   각각의 선언은 저마다 새 줄을 차지한다;
-   콜론(`:`) 뒤에는 스페이스 한 칸을 둔다;
-   모든 선언의 끝은 세미콜론(`;`)으로 마무리한다;
-   닫는 중괄호(`}`)는 새 줄을 차지한다;
-   닫는 중괄호(`}`) 뒤에 새 줄.

보기:

```
// Yep
.foo, .foo-bar,
.baz {
  display: block;
  overflow: hidden;
  margin: 0 auto;
}

// Nope
.foo,
.foo-bar, .baz {
    display: block;
    overflow: hidden;
    margin: 0 auto }
```

```
// Yep
.foo, .foo-bar,
.baz
  display: block
  overflow: hidden
  margin: 0 auto

// Nope
.foo,
.foo-bar, .baz
    display: block
    overflow: hidden
    margin: 0 auto
```

CSS와 관련된 가이드라인에 더해, 우리는 다음 사항들에 관심을 기울여야 합니다:

-   지역 변수는 어떤 선언보다 먼저 선언되어야 하며, 새 줄 하나로 다른 선언들과 간격을 둔다;
-   `@content`가 없는 믹스인 호출은 다른 선언보다 앞에 위치한다;
-   내포된 선택자는 언제나 새 줄 뒤에 온다;
-   `@content`를 가진 믹스인 호출은 내포된 선택자보다 뒤에 위치한다;
-   닫는 중괄호(`}`) 앞에는 새 줄이 없어야 한다.

보기:

```
.foo, .foo-bar,
.baz {
  $length: 42em;

  @include ellipsis;
  @include size($length);
  display: block;
  overflow: hidden;
  margin: 0 auto;

  &:hover {
    color: red;
  }

  @include respond-to('small') {
    overflow: visible;
  }
}
```

```
.foo, .foo-bar,
.baz
  $length: 42em

  +ellipsis
  +size($length)
  display: block
  overflow: hidden
  margin: 0 auto

  &:hover
    color: red

  +respond-to('small')
    overflow: visible
```

### 선언 정렬

전 CSS 선언을 정렬하는 문제만큼 견해가 갈리는 주제를 별로 떠올릴 수가 없습니다. 구체적으로, 여기 두 파가 있습니다:

-   알파벳 순서 고수하기
-   유형 별로 정렬하기(position, display, colors, font, 기타 등등…).

두 가지 방법 모두 장단점이 있습니다. 우선, 알파벳순은 (적어도 로마자를 사용하는 언어에서는) 보편적인 만큼 한 속성을 다른 속성 앞에 정렬하는 문제가 논쟁거리가 못됩니다. 하지만, `bottom`과 `top` 같은 속성들이 서로 붙어있지 않은 모습이 제겐 엄청나게 이상해 보입니다. 왜 애니메이션이 디스플레이 유형보다 먼저 나와야 합니까? 알파벳순에는 이상한 점이 많이 있습니다.

```
.foo {
  background: black;
  bottom: 0;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  height: 100px;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 100px;
}
```

```
.foo
  background: black
  bottom: 0
  color: white
  font-weight: bold
  font-size: 1.5em
  height: 100px
  overflow: hidden
  position: absolute
  right: 0
  width: 100px
```

반면, 유형별로 속성을 정렬하는 것은 아주 타당합니다. 모든 폰트 관련 선언들이 한데 모이고, `top`과 `bottom`은 재결합하며 규칙들을 보면 마치 짧은 이야기를 읽는 느낌입니다. 그러나 [Idiomatic CSS](https://github.com/necolas/idiomatic-css)와 같은 관례를 고수하지 않는 한 이 방식은 여러 가지로 해석될 수 있습니다. `white-space`는 어디로 가야 할까요: 폰트 혹은 디스플레이? `overflow`는 정확히 어디에 속할까요? 그룹 내에서 속성들의 순서는 어떻게 되어야 할까요(역설적이게도, 알파벳순으로 정렬할 수도 있겠죠)?

```
.foo {
  height: 100px;
  width: 100px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  background: black;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
```

```
.foo
  height: 100px
  width: 100px
  overflow: hidden
  position: absolute
  bottom: 0
  right: 0
  background: black
  color: white
  font-weight: bold
  font-size: 1.5em
```

유형별 정렬의 다른 흥미로운 하위 갈래로 [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS)라는 것이 있는데, 이것 역시 꽤 많이 사용되는 듯 합니다. 기본적으로, Concentric CSS는 순서를 정의하기 위해 박스 모델에 의존합니다: 바깥쪽에서 출발해서, 안쪽으로 들어오게 되죠.

```
.foo {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: black;
  overflow: hidden;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
```

```
.foo
  width: 100px
  height: 100px
  position: absolute
  right: 0
  bottom: 0
  background: black
  overflow: hidden
  color: white
  font-weight: bold
  font-size: 1.5em
```

저 스스로도 결정할 수가 없다는 점을 말씀드려야겠습니다. [CSS Tricks에서의 최근 설문조사](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)에 따르면 45% 이상의 개발자들이 유형별로, 14%가 알파벳순으로 선언을 정렬하는 것으로 나타났습니다. 또한, 완전히 임의로 정렬하는 39%의 개발자들도 있습니다. 저를 포함해서요.

  ![개발자들의 CSS 선언 정렬 방식을 보여주는 도표 ](https://sass-guidelin.es/assets/images/css-order-chart.png)

개발자들의 CSS 선언 정렬 방식을 보여주는 도표

이 때문에, 이 스타일가이드에서는 선택을 강요하지 않겠습니다. 여러분이 스타일시트 내내 일관성을 유지하기만 한다면, 맘에 드는 걸로 고르시면 됩니다(즉, _랜덤_이 아닌 한).

[최근의 연구](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/)는 ([유형별 정렬](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)을 이용하는) [CSScomb](https://github.com/csscomb/csscomb.js)를 사용한 CSS 선언 정렬이 Gzip 압축 시 평균 파일 크기를 2.7% 줄인다는 결과를 보여줍니다. 그에 비해, 알파벳순으로 정렬했을 때는 1.3%가 줄었습니다.

### 선택자 내포Nesting

Sass가 제공하는 기능 중 많은 개발자들에 의해 심하게 남용되고 있는 것 하나는 _선택자 내포_입니다. 선택자 내포는 짧은 선택자들을 서로 포개어 넣음으로써 긴 선택자를 산출해 내는 방식을 제안합니다.

#### 일반적인 규칙

예로, 아래의 Sass는:

```
.foo {
  .bar {
    &:hover {
      color: red;
    }
  }
}
```

```
.foo
  .bar
    &:hover
      color: red
```

… 이런 CSS를 만들어냅니다:

```
.foo .bar:hover {
  color: red;
}
```

같은 방식으로, Sass 3.3부터는 현재 선택자 참조(`&`)를 이용해 고급 선택자를 생성하는 것이 가능합니다. 예를 들면:

```
.foo {
  &-bar {
    color: red;
  }
}
```

```
.foo
  &-bar
    color: red
```

… 위의 코드는 이런 CSS를 생성합니다:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

이 방법은 종종 [BEM 작명 관례](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)와 함께 `.block__element`와 `.block__modifier` 선택자를 원래 선택자(이 경우엔 `.block`)에 기반하여 생성하는 데 사용됩니다.

반드시 그런 건 아닐 수도 있지만, 현재 선택자 참조(`&`)로 새로운 선택자를 생성하면 그 선택자 자체가 코드베이스에 존재하지 않기 때문에 검색을 할 수 없게 됩니다.

선택자 내포의 문제는 결과적으로 코드를 읽기 어렵게 만든다는 것입니다. 읽기 위해서는 들여쓰기의 단계를 바탕으로 산출되는 선택자를 마음속으로 계산해야 합니다; CSS가 어떤 모습이 될지 항상 명확한 것은 아닙니다.

선택자가 길어지고 현재 선택자(`&`)를 더 자주 인용할수록 더더욱 그러합니다. 어느 순간이 되면, 선택자를 파악하고 무슨 일이 일어나고 있는지 더이상 이해하기가 힘들어질 위험이 너무 커지기 때문에 무릅쓸 만한 가치가 없습니다.

이러한 상황을 방지하기 위해 우리는 몇 년 전 [인셉션 규칙](https://thesassway.herokuapp.com/beginner/the-inception-rule)에 대해 많이 이야기했습니다. 크리스토퍼 놀런의 영화 인셉션에 대한 레퍼런스로, 3단계 이상으로 깊이 내포하지 말자고 했습니다. 저는 좀 더 과감하고 **가능한 한 많이 선택자 내포를 피하는 것**을 추천합니다.

다음 섹션에서 볼 수 있듯이 이 규칙에 대한 몇 가지 예외가 분명히 있지만, 이 의견은 꽤 인기 있는 것 같습니다. 자세한 내용은 [선택자 내포에 주의하세요](https://www.sitepoint.com/beware-selector-nesting-sass/) 및 [더 많은 모듈식 CSS에 대한 내포 선택자 방지](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css)에서 자세히 읽을 수 있습니다.

#### 예외

우선, 원래의 선택자 안에 가상 클래스와 가상 요소를 내포하는 것은 허용되며 나아가 추천할 만합니다.

```
.foo {
  color: red;

  &:hover {
    color: green;
  }

  &::before {
    content: 'pseudo-element';
  }
}
```

```
.foo
  color: red

  &:hover
    color: green

  &::before
    content: 'pseudo-element'
```

가상 클래스와 가상 요소에 선택자 내포를 사용하는 것은 (밀접하게 관련된 선택자를 다루므로) 타당할 뿐만 아니라, 한 컴퍼넌트에 관한 모든 것을 같은 장소에 유지하는 데 도움이 됩니다.

또한, `.is-active` 같은 컴퍼넌트에 독립적인 상태 클래스를 사용할 때, 컴퍼넌트의 선택자 아래에 내포하여 깔끔하게 정리하는 것에는 아무 문제가 없습니다.

```
.foo {
  // …

  &.is-active {
    font-weight: bold;
  }
}
```

```
.foo
  // …

  &.is-active
    font-weight: bold
```

마지막으로 짚어야 할 것으로, 요소를 꾸밀 때, 그것이 우연히 다른 특정 요소 안에 들어가 있다면 그 컴퍼넌트에 관한 모든 것을 한 곳에 유지하기 위해 내포를 사용하는 것은 문제가 없습니다.

```
.foo {
  // …

  .no-opacity & {
    display: none;
  }
}
```

```
.foo
  // …

  .no-opacity &
    display: none
```

모든 것이 그렇듯이, 세부사항은 크게 상관이 없으며, 일관성이 핵심입니다. 선택자 내포에 충분한 확신이 있다면 선택자 내포를 사용하세요. 단지 여러분의 팀 전체가 그 선택에 동의하는지 확실히 하시면 됩니다.

## 작명 관례

이 절에서는, 유지와 확장을 위한 최고의 CSS 작명 관례를 다루진 않을 것입니다; 그것은 여러분에게 달린 문제일 뿐만 아니라, Sass 스타일가이드의 범위를 벗어나는 것이기도 합니다. 전 [CSS Guidelines](https://cssguidelin.es/#naming-conventions)가 추천하는 방법을 참고하시길 권하겠습니다.

Sass에서 이름을 붙일 수 있는 것들이 몇 가지 있는데, 코드베이스 전체가 일관되며 읽기 쉽도록 이름을 잘 짓는 것이 중요합니다:

-   변수;
-   함수;
-   믹스인.

Sass 플레이스홀더는 이 목록에서 일부러 제외했습니다. 플레이스홀더는 보통의 CSS 선택자로 간주될 수 있고, 따라서 클래스와 똑같은 작명 패턴을 따를 수 있기 때문입니다.

변수, 함수, 믹스인에 관해서, 우리는 매우 _CSS스러운_ 것을 고수할 것입니다: **하이픈으로 구분된 소문자**, 그리고 무엇보다도 의미 있는 이름이어야 합니다.

```
$vertical-rhythm-baseline: 1.5rem;

@mixin size($width, $height: $width) {
  // …
}

@function opposite-direction($direction) {
  // …
}
```

```
$vertical-rhythm-baseline: 1.5rem

=size($width, $height: $width)
  // …

@function opposite-direction($direction)
  // …
```

### 상수

만약 여러분이 프레임워크 개발자나 라이브러리 작가라면, 아마 어떤 상황에서도 갱신되지 않아야 하는 변수를 다루게 될 것입니다: 상수. 불행히도 (혹은 다행히도?), 사스는 그런 개체를 정의할 어떤 방법도 제공하지 않기 때문에, 우리는 목적을 달성하기 위해 엄격한 작명 관례를 고수해야만 합니다.

많은 언어들의 경우처럼, 상수에 대해 저는 모두 대문자로 된 스네이크 케이스 변수를 권합니다. 이것이 매우 오래된 관례일 뿐만 아니라, 보통의 하이픈으로 연결된 소문자 변수와 잘 대비되기 때문입니다.

```
// Yep
$CSS_POSITIONS: (top, right, bottom, left, center);

// Nope
$css-positions: (top, right, bottom, left, center);
```

```
// Yep
$CSS_POSITIONS: (top, right, bottom, left, center)

// Nope
$css-positions: (top, right, bottom, left, center)
```

Sass에서 상수를 정말 잘 다루고 싶다면, [이 전용 글](https://www.sitepoint.com/dealing-constants-sass/)을 읽어야 합니다.

### 네임스페이스

라이브러리나 프레임워크, 그리드 시스템 혹은 무엇이 됐든 Sass 코드를 배포할 생각이라면, 다른 사람의 코드와 충돌하지 않도록 모든 변수, 함수, 믹스인, 플레이스홀더를 네임스페이스 안에 넣는 것이 좋을 것입니다.

예를 들면, 세계 전역의 개발자들에 의해 사용될 _Sassy Unicorn_ 프로젝트를 작업하고 있다면 (누가 아니겠어요, 그렇죠?), `su-`를 네임스페이스로 붙이는 걸 고려할 수 있을 겁니다. 이 정도면 어떤 명명 충돌도 방지할 수 있을 정도로 충분히 구체적이고 쓰기 괴롭지 않을 정도로 충분히 짧습니다.

```
$su-configuration: ( … );

@function su-rainbow($unicorn) {
  // …
}
```

```
$su-configuration: ( … )

@function su-rainbow($unicorn)
  // …
```

이 주제에 관심이 있다면 [Kaelig](https://kaelig.fr/)의 [글로벌 CSS 네임스페이스에 대한 매우 통찰력 있는 글](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace)을 한 번 읽어보세요.

자동 네임스페이스는 단연 사스 4.0에서 곧 있을 `@import` 개선의 설계 목표입니다. 그것이 결실을 맺기에 가까워지면서, 수동 네임스페이스는 점점 유용성이 떨어질 것입니다: 결국에는, 수동 네임스페이스를 이용한 라이브러리는 실제로 사용하기가 더 어려워질 수도 있습니다.

## 설계

CSS 프로젝트를 설계하는 것은 아마도 프로젝트의 일생에서 여러분이 해야 할 가장 어려운 일 중 하나일 것입니다. 구조를 일관되고 의미 있게 유지하는 것은 더더욱 어렵습니다.

다행히도, CSS 전처리기를 사용함으로써 얻는 주된 장점 중 하나는 (CSS 지시어 `@import`와 달리) 성능에 영향을 주지 않고 코드베이스를 여러 파일로 분리할 수 있게 된다는 것입니다. Sass가 `@import` 지시어의 무거운 짐을 짊어진 덕분에 개발 단계에서 필요한 만큼 많은 파일을 사용하는 것이 완벽하게 안전하며, 생산 단계에서 모든 파일들이 하나의 스타일시트로 컴파일됩니다.

무엇보다도, 폴더의 중요성에 대해서는 아무리 강조해도 지나치지 않습니다. 심지어 작은 규모의 프로젝트에서조차 말입니다. 집에서도 모든 서류를 같은 박스에 넣지는 않는 법입니다. 폴더를 사용하겠죠: 집/아파트용, 은행용, 청구서용, 기타 등등. CSS 프로젝트를 구축할 때도 다르게 할 이유가 없습니다. 나중에 코드로 돌아왔을 때 찾아내기 쉽도록 코드베이스를 의미 있는 분리된 폴더로 나누세요.

CSS 프로젝트를 위한 [잘 알려진 설계 양식들](https://www.sitepoint.com/look-different-sass-architectures/)이 많이 있습니다: [OOCSS](http://oocss.org/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), [Bootstrap](https://getbootstrap.com/)류, [Foundation](https://get.foundation/)류… 이들 모두 훌륭하며, 장단점을 갖고 있습니다.

저 스스로는 [Jonathan Snook](https://snook.ca/)의 [SMACSS](http://smacss.com/)와 아주 비슷한 접근법을 사용하는데, 이것은 간단명료함을 유지하는 데에 초점을 맞추고 있습니다.

저는 설계가 대부분의 경우 프로젝트에 한정되어 있다는 사실을 배웠습니다. 여러분의 필요에 맞는 시스템을 사용할 수 있도록 제시된 해법을 마음대로 폐기하거나 조정하세요.

### 컴퍼넌트

_작동하게_ 만드는 것과 _좋게_ 만드는 것 사이에는 커다란 차이가 있습니다. 다시 한번 말하자면, CSS는 아주 엉망인 언어입니다\[citation needed\]. 더 적은 CSS를 가질수록, 더 즐거워집니다. 우리는 수 메가바이트의 CSS 코드를 다루는 것을 원하지 않습니다. 스타일시트를 짧고 효율적으로 유지하기 위해서는 —전혀 놀랍지 않게도— 인터페이스를 컴퍼넌트의 모음이라고 여기는 것이 대개 좋은 생각입니다.

다음 요건들을 충족한다면 컴퍼넌트가 될 수 있습니다:

-   단 한 가지 일만 한다;
-   재사용이 가능하고 프로젝트 전체에 걸쳐 재사용된다;
-   독립적이다.

예를 들면, 검색 폼은 컴퍼넌트로 취급되어야 합니다. 그것은 다른 위치, 다른 페이지에서, 다양한 상황에서 재사용이 가능해야 합니다. DOM에서의 위치(footer, sidebar, main content…)에 의존해서는 안 됩니다.

대부분의 인터페이스는 작은 컴퍼넌트로 생각할 수 있으며 이러한 인식을 고수할 것을 강력히 추천합니다. 이는 전체 프로젝트에 필요한 CSS의 양을 줄일 뿐만 아니라 모든 것이 혼란스러운 난장판보다 유지를 더 쉽게 만들기도 합니다.

### 컴퍼넌트 구조

이상적으로, 컴퍼넌트는 `components/_button.scss`와 같이 스스로의 Sass 해당 부분 ([7-1 패턴](#section-37)에서 설명한 대로 `components/` 폴더 내)에 있어야 합니다. 각 컴퍼넌트 파일에 설명된 스타일은 다음 사항에만 관련되어야 합니다:

-   컴퍼넌트 스스로의 스타일;
-   컴퍼넌트의 변수, 모디파이어 그리고/또는 상태의 스타일;
-   필요한 경우 컴퍼넌트 후손(즉, 자식)의 스타일

컴퍼넌트 부분은 컴퍼넌트별 변수, 플레이스홀더, 심지어 믹스인과 함수를 포함할 수 있습니다. 하지만, 명심하세요. 다른 컴퍼넌트 파일에서 컴퍼넌트 파일을 참조 (즉, `@import`\-ing)하는 것은 피해야 합니다. 이렇게 하면 프로젝트의 종속성 그래프가 유지 관리할 수 없이 엉망이 될 수 있습니다.

다음은 버튼 컴퍼넌트 부분의 예입니다:

```
// 버튼 관련 변수
$button-color: $secondary-color;

// … 버튼 관련 include
// - 믹스인
// - 플레이스홀더
// - 함수

/**
 * 버튼
 */
.button {
  @include vertical-rhythm;
  display: block;
  padding: 1rem;
  color: $button-color;
  // … 등.

  /**
   * 큰 화면의 인라인 버튼
   */
  @include respond-to('medium') {
    display: inline-block;
  }
}

/**
 * 버튼 내의 아이콘
 */
.button > svg {
  fill: currentcolor;
  // … 등.
}

/**
 * 인라인 버튼
 */
.button--inline {
  display: inline-block;
}
```

```
// 버튼 관련 변수
$button-color: $secondary-color

// … 버튼 관련 include
// - 믹스인
// - 플레이스홀더
// - 함수

/**
 * 버튼
 */
.button
  +vertical-rhythm
  display: block
  padding: 1rem
  color: $button-color
  // ... 등.

  /**
   * 큰 화면의 인라인 버튼
   */
  +respond-to('medium')
    display: inline-block
}

/**
 * 버튼 내의 아이콘
 */
.button > svg
  fill: currentcolor
  // ... 등.

/**
 * 인라인 버튼
 */
.button--inline
  display: inline-block
```

### 7-1 패턴

다시 설계로 돌아가 볼까요? 저는 보통 제가 _7-1 패턴_ 이라고 부르는 것을 사용합니다: 폴더 7개, 파일 1개. 기본적으로, 7개의 다른 폴더에 채워 넣은 모든 부분 파일과, 이들을 불러들여 CSS 스타일시트로 컴파일하는 루트 레벨에 있는 하나의 파일(대개 `main.scss`)을 갖게 됩니다.

-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `abstracts/`
-   `vendors/`

그리고 물론:

-   `main.scss`

7-1 패턴을 사용하려는 경우, 여기 [보일러플레이트](https://github.com/KittyGiraudel/sass-boilerplate)가 Github에 준비돼있습니다. 여기에는 이 설계를 시작하는 데 필요한 모든 것이 포함되어야 합니다.

  

배경화면 by [Julien He](https://twitter.com/julien_he)

이상적으로, 우리는 이런 구조를 만들어 낼 수 있습니다:

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass 변수
|   |– _functions.scss    # Sass 함수
|   |– _mixins.scss       # Sass 믹스인
|   |– _placeholders.scss # Sass 플레이스홀더
|
|– base/
|   |– _reset.scss       # 리셋/정규화
|   |– _typography.scss  # 타이포그래피 규칙
|   …                    # 기타.
|
|– components/
|   |– _buttons.scss     # 버튼
|   |– _carousel.scss    # 캐러셀
|   |– _cover.scss       # 커버
|   |– _dropdown.scss    # 드롭다운
|   …                    # 기타.
|
|– layout/
|   |– _navigation.scss  # 네비게이션
|   |– _grid.scss        # 그리드 시스템
|   |– _header.scss      # 헤더
|   |– _footer.scss      # 푸터
|   |– _sidebar.scss     # 사이드바
|   |– _forms.scss       # 폼
|   …                    # 기타.
|
|– pages/
|   |– _home.scss        # 홈 한정 스타일
|   |– _contact.scss     # 연락처 한정 스타일
|   …                    # 기타.
|
|– themes/
|   |– _theme.scss       # 디폴트 테마
|   |– _admin.scss       # 관리자 테마
|   …                    # 기타.
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   …                    # 기타.
|
`– main.scss             # 메인 Sass 파일
```

파일은 위에서 설명한 작명 관례를 따라 하이픈으로 구분됩니다.

#### Base 폴더

`base/` 폴더는 프로젝트의 보일러플레이트 코드라고 부를 만한 것을 담습니다. 거기에선, 리셋 파일, 타이포그래피 규칙, 그리고 아마도 자주 사용되는 HTML 요소에 대한 표준 스타일을 정의하는 스타일시트(전 `_base.scss`라고 부릅니다)를 찾을 수 있을 것입니다.

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

프로젝트에서 CSS 애니메이션을 _많이_ 사용한다면, 모든 애니메이션의 `@keyframes` 정의를 포함하는 `\_animations.scss` 파일을 추가하는 것을 고려해볼 수 있습니다. 산발적으로만 사용한다면, 이를 사용하는 선택자에 포함하세요.

#### Layout 폴더

`layout/` 폴더에는 사이트나 어플리케이션의 레이아웃에 기여하는 모든 것들이 들어갑니다. 이 폴더는 사이트의 주요 부분(header, footer, navigation, sidebar…), 그리드 시스템 혹은 모든 폼의 스타일을 위한 스타일시트를 가질 수도 있습니다.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

`layout/` 폴더는 `partials/`라고 불릴 수도 있습니다. 이는 여러분이 선호하는 바에 달렸습니다.

#### Components 폴더

`components/` 폴더에는 더 작은 컴퍼넌트들이 들어갑니다. `layout/`이 (전반적인 뼈대를 정의하는) 거시적인 폴더임에 반해, `components/`는 위젯에 초점을 둡니다. 이 폴더는 슬라이더, 로더, 위젯, 그리고 기본적으로 이들과 비슷한 것을 비롯해 온갖 구체적인 모듈들을 담습니다. 전체 사이트/어플리케이션이 주로 작은 모듈들로 구성되어야 하므로 `components`에는 대개 많은 파일들이 있습니다.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

`components/` 폴더는 선호에 따라 `modules/`라고 불릴 수도 있습니다.

#### Pages 폴더

만약 페이지에 한정된 스타일이 있다면, 그것은 `pages/` 폴더 속, 페이지 이름을 딴 파일에 넣는 것이 좋습니다. 예를 들면, 홈페이지에만 한정된 스타일이 있어 `pages/` 폴더 속 `_home.scss` 파일이 필요해지는 것은 드문 일이 아닙니다.

-   `_home.scss`
-   `_contact.scss`

이 파일들은 배포 과정에 따라, 산출되는 스타일시트에서 다른 파일과 병합되는 것을 피하기 위해 별도로 호출될 수 있습니다. 이것은 여러분이 결정할 문제입니다.

#### Themes 폴더

큰 사이트와 어플리케이션에서 여러 다른 테마들을 갖는 것은 흔히 있는 일입니다. 물론 테마를 다루는 다른 방법들도 있지만, 개인적으로는 `themes/` 폴더에 전부 모아두는 것을 좋아합니다.

-   `_theme.scss`
-   `_admin.scss`

이것은 프로젝트에 달려있는 것으로 많은 프로젝트에서는 존재할지 않을 가능성이 큽니다.

#### Abstracts 폴더

`abstracts/` 폴더는 프로젝트에서 사용되는 모든 Sass 도구와 헬퍼를 모읍니다. 모든 전역 변수, 함수, 믹스인, 플레이스홀더는 여기로 들어가야 합니다.

이 폴더에 대한 경험적 법칙은 그 자체만으로는 컴파일되었을 때 한 줄의 CSS도 산출하지 않아야 한다는 것입니다. 이것은 그저 Sass 헬퍼일 뿐입니다.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss`

추상적인 유틸리티가 많은 매우 큰 프로젝트를 작업할 때는 유형보다는 주제별로 그룹화하는 것이 흥미로울 수 있습니다. 예를 들어, 타이포그래피(`_typography.scss`), 테마(`_theming.scss`) 등과 같이 말이죠. 각 파일에는 모든 관련 도움말이 포함되어 있습니다: 변수, 함수, 믹스인 및 플레이스홀더 등. 이렇게 하면 특히 파일이 매우 길어질 때, 코드를 더 쉽게 찾아보고 유지 관리할 수 있습니다.

`abstracts/` 폴더는 선호에 따라 `utilities/` 혹은 `helpers/`로 불릴 수도 있습니다.

#### Vendors 폴더

그리고 마지막으로 잊지 말아야 할 것으로, 대부분의 프로젝트는 Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered 등의 외부 라이브러리와 프레임워크에서 나오는 모든 CSS 파일을 담고 있는 `vendors/` 폴더를 가집니다. 이들을 같은 폴더에다 치워두는 것은 “저기요, 이건 내가 한 게 아닙니다. 내 코드가 아니고, 나는 책임이 없습니다”라고 말하는 좋은 방법입니다.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

만약 어느 vendor의 한 부분을 덮어써야 한다면, 덮어쓰는 vendor의 이름을 그대로 딴 파일들을 담는 여덟 번째 폴더인 `vendors-extensions/`를 만드는 것을 추천합니다.

예를 들면, `vendors-extensions/_boostrap.scss`는 Bootstrap의 기본 CSS 일부를 재선언하는 모든 CSS 규칙을 담고 있는 파일입니다. 이는 vendor 파일 자체를 편집하는 것을 피하기 위함입니다. 그건 대개 좋은 생각이 아니니까요.

#### Main 파일

(주로 `main.scss`로 이름이 붙는) 메인 파일은 전체 코드베이스에서 언더스코어로 시작하지 않는 유일한 Sass 파일이어야 합니다. 이 파일은 `@import`와 주석 외에는 아무것도 포함하지 않아야 합니다.

파일들은 각자 자리 잡은 폴더에 따라 아래의 순서대로 하나하나 불러들여집니다:

1.  `abstracts/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

가독성을 유지하기 위해, 메인 파일은 이 가이드라인을 준수해야 합니다:

-   `@import` 당 파일 하나;
-   한 줄에 하나의 `@import`;
-   같은 폴더로부터의 두 import 사이는 새 줄로 띄우지 않는다;
-   한 폴더로부터의 마지막 import 다음에는 새 줄 하나로 간격을 둔다.
-   파일 확장자와 앞에 붙는 언더스코어는 생략한다.

```
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/cover';
@import 'components/dropdown';

@import 'pages/home';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
```

```
@import vendors/bootstrap
@import vendors/jquery-ui

@import utils/variables
@import utils/functions
@import utils/mixins
@import utils/placeholders

@import base/reset
@import base/typography

@import layout/navigation
@import layout/grid
@import layout/header
@import layout/footer
@import layout/sidebar
@import layout/forms

@import components/buttons
@import components/carousel
@import components/cover
@import components/dropdown

@import pages/home
@import pages/contact

@import themes/theme
@import themes/admin
```

부분 파일을 불러오는 다른 합당한 방법도 있습니다. 밝은 면을 보자면, 이 방법은 파일을 보다 읽기 좋게 만듭니다. 반면, 수정하는 일은 약간 괴로워집니다. 어쨌든, 어느 것이 최고인지는 여러분이 결정하게 하겠습니다. 이건 별문제가 안 되니까요. 이 방법으로 하면, 메인 파일은 이 가이드라인을 준수해야 합니다:

-   폴더 당 하나의 `@import`;
-   `@import` 뒤에 줄 바꿈;
-   각 파일은 한 줄을 차지한다;
-   한 폴더로부터의 마지막 import 다음에는 새 줄 하나로 간격을 둔다;
-   파일 확장자와 앞에 붙는 언더스코어는 생략한다.

```
@import
  'abstracts/variables',
  'abstracts/functions',
  'abstracts/mixins',
  'abstracts/placeholders';

@import
  'vendors/bootstrap',
  'vendors/jquery-ui';

@import
  'base/reset',
  'base/typography';

@import
  'layout/navigation',
  'layout/grid',
  'layout/header',
  'layout/footer',
  'layout/sidebar',
  'layout/forms';

@import
  'components/buttons',
  'components/carousel',
  'components/cover',
  'components/dropdown';

@import
  'pages/home',
  'pages/contact';

@import
  'themes/theme',
  'themes/admin';
```

```
@import
  vendors/bootstrap,
  vendors/jquery-ui

@import
  utils/variables,
  utils/functions,
  utils/mixins,
  utils/placeholders

@import
  base/reset,
  base/typography

@import
  layout/navigation,
  layout/grid,
  layout/header,
  layout/footer,
  layout/sidebar,
  layout/forms

@import
  components/buttons,
  components/carousel,
  components/cover,
  components/dropdown

@import
  pages/home,
  pages/contact

@import
  themes/theme,
  themes/admin
```

### 글로빙에 대하여

컴퓨터 프로그래밍에서 글로브 패턴은 `*.scss`와 같은 와일드카드 문자로 파일 이름 집합을 지정합니다. 일반적으로 글로빙은 파일 이름 목록 대신 표현식을 기준으로 파일 집합을 일치시키는 것을 의미합니다. Sass에 적용해보자면, 부분을 개별적으로 나열하는 것이 아니라 글로브 패턴으로 [main file](#main-)로 가져오는 것을 의미합니다. 이렇게 하면 메인 파일이 다음과 같이 보이게 됩니다:

```
@import 'abstracts/*';
@import 'vendors/*';
@import 'base/*';
@import 'layout/*';
@import 'components/*';
@import 'pages/*';
@import 'themes/*';
```

```
@import 'abstracts/*'
@import 'vendors/*'
@import 'base/*'
@import 'layout/*'
@import 'components/*'
@import 'pages/*'
@import 'themes/*'
```

Sass는 파일 글로빙을 바로 지원하지는 않습니다. CSS가 순서에 따라 달라지는 것으로 알려져 있어 위험한 기능이 될 수 있기 때문이죠. 파일을 동적으로 가져올 때(대개 알파벳 순서로 진행됨) 소스 순서를 더이상 제어하지 않아 부작용을 디버깅하기 어려울 수 있습니다.

말하자면, 한 부분으로부터 다른 부분으로 어떤 스타일도 유출하지 않도록 특별히 주의를 기울이는 엄격한 컴퍼넌트 기반 설계에서는 순서가 더이상 중요하지 않기에, 글로브 import가 허용될 것입니다. 이렇게 하면 더는 메인 파일을 주의 깊게 업데이트할 필요가 없으므로 부분 파일을 추가하거나 제거하기가 더 쉬워질 것입니다.

Ruby Sass를 사용할 때, 정확히 그 동작을 가능하게 하는 [sass-globbing](https://github.com/chriseppstein/sass-globbing)이라는 Ruby gem이 있습니다. node-sass에서 실행한다면, Node.js 또는 컴파일을 처리하기 위해 사용하는 빌드 도구(Gulp, Grunt 등)에 의존할 수 있습니다.

### Shame 파일

[Harry Roberts](https://csswizardry.com/), [Dave Rupert](https://daverupert.com/), [Chris Coyier](https://css-tricks.com/)에 의해 알려진 흥미로운 개념이 있습니다. 이는 모든 CSS 선언과 핵, 그리고 우리가 자랑스럽게 여기지 않는 것들을 _[수치 파일](https://csswizardry.com/2013/04/shame-css-full-net-interview/)_에 넣는 것으로 이루어집니다. 이 파일은, 극적이게도 `_shame.scss`라고 불리며, 스타일시트의 맨 끝에서, 다른 모든 파일들 다음으로 불러들여질 것입니다.

```
/**
 * Nav 한정성 해결.
 *
 * 누군가 헤더 코드에 ID를 사용해서 (`#header a {}`) 네비게이션 선택자
 * (`.site-nav a {}`)가 무효화됨. 헤더 부분 리팩터링할 시간이 날 때까지
 * !important로 덮어쓸 것.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Nav 한정성 해결.
 *
 * 누군가 헤더 코드에 ID를 사용해서 (`#header a {}`) 네비게이션 선택자
 * (`.site-nav a {}`)가 무효화됨. 헤더 부분 리팩터링할 시간이 날 때까지
 * !important로 덮어쓸 것.
 */
.site-nav a
    color: #BADA55 !important
```

## 반응형 웹 디자인과 브레이크포인트

반응형 웹 디자인은 이제 어디에서나 볼 수 있는 만큼 따로 소개해야 한다고 생각하진 않습니다. _Sass 스타일가이드에 왜 RWD(Responsive Web Design) 섹션이 있는 거야?_라고 자문하실지도 모르겠습니다. 사실 브레이크포인트의 사용을 쉽게 만들기 위해 할 수 있는 일들이 꽤 있고, 그래서 여기에 포함시키는 게 그리 나쁜 아이디어는 아닐 거라 생각했습니다.

### 브레이크포인트 이름 짓기

미디어 쿼리가 특정 기기에 의존해서는 안 된다고 말해도 과언은 아닐 거라 생각합니다. 예를 들면, 아이패드나 블랙베리 폰을 특정해서 겨냥하는 것은 분명 나쁜 생각입니다. 디자인이 깨지고 다음 미디어 쿼리가 넘겨받기 전까지, 미디어 쿼리는 다양한 스크린 크기를 처리해야 합니다.

같은 이유로, 브레이크포인트는 기기의 이름이 아니라 보다 보편적인 것을 따라서 이름 지어져야 합니다. 특히 몇몇 폰은 이제 태블릿보다 크고, 몇몇 태블릿은 일부 작은 스크린의 컴퓨터보다 크기 때문입니다.

```
// Yep
$breakpoints: (
  'medium': (min-width: 800px),
  'large': (min-width: 1000px),
  'huge': (min-width: 1200px),
);

// Nope
$breakpoints: (
  'tablet': (min-width: 800px),
  'computer': (min-width: 1000px),
  'tv': (min-width: 1200px),
);
```

```
// Yep
$breakpoints: ('medium': (min-width: 800px), 'large': (min-width: 1000px), 'huge': (min-width: 1200px))

// Nope
$breakpoints: ('tablet': (min-width: 800px), 'computer': (min-width: 1000px), 'tv': (min-width: 1200px))
```

이런 견지에서 볼 때, 디자인이 특정 기기에 직접적으로 관련되지 않았다는 것을 명확히 밝히는 [어떤 작명 관례](https://css-tricks.com/naming-media-queries/)도 괜찮습니다. 크기에 대한 감을 전해줄 수 있기만 하면 됩니다.

```
$breakpoints: (
  'seed': (min-width: 800px),
  'sprout': (min-width: 1000px),
  'plant': (min-width: 1200px),
);
```

```
$breakpoints: ('seed': (min-width: 800px), 'sprout': (min-width: 1000px), 'plant': (min-width: 1200px))
```

앞의 예시들은 브레이크포인트를 정의하기 위해 맵을 중첩해서 사용하고 있지만, 이건 여러분이 어떤 브레이크포인트 매니저를 사용하는가에 전적으로 달렸습니다. 유연성을 위해 맵을 포개어넣는 대신 문자열을 선택할 수도 있을 겁니다. (예를 들면 `'(min-width: 800px)'`).

### 브레이크포인트 매니저

일단 원하는 방식으로 브레이크포인트의 이름을 짓고 나면, 실제 미디어쿼리에서 사용할 방법이 필요합니다. 많은 방법들이 있지만 전 getter 함수로 읽을 수 있는 브레이크포인트 맵의 열혈 팬이라는 것을 밝혀야겠습니다. 이 시스템은 간단하면서도 효과적입니다.

```
/// 반응형 매니저
/// @access public
/// @param {String} $breakpoint - 브레이크포인트
/// @requires $breakpoints
@mixin respond-to($breakpoint) {
  $raw-query: map-get($breakpoints, $breakpoint);

  @if $raw-query {
    $query: if(
      type-of($raw-query) == 'string',
      unquote($raw-query),
      inspect($raw-query)
    );

    @media #{$query} {
      @content;
    }
  } @else {
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.';
  }
}
```

```
/// 반응형 매니저
/// @access public
/// @param {String} $breakpoint - 브레이크포인트
/// @requires $breakpoints
=respond-to($breakpoint)
  $raw-query: map-get($breakpoints, $breakpoint)

  @if $raw-query
    $query: if(type-of($raw-query) == 'string', unquote($raw-query), inspect($raw-query))

    @media #{$query}
      @content

  @else
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.'
```

### 미디어 쿼리 사용법

얼마 전, 미디어 쿼리를 어디에 작성해야 하는지에 대한 치열한 논쟁이 있었습니다: 선택자 안으로 들어가야 하는가(Sass에서는 가능하므로), 아니면 철저하게 분리해야 하는가? 저는 _선택자-속-미디어-쿼리_ 시스템의 열렬한 옹호자라는 점을 밝혀야겠습니다. 그쪽이 _컴퍼넌트_ 아이디어와 잘 어울린다고 생각하거든요.

```
.foo {
  color: red;

  @include respond-to('medium') {
    color: blue;
  }
}
```

```
.foo
  color: red

  +respond-to('medium')
    color: blue
```

위의 코드는 다음의 CSS를 만들어냅니다:

```
.foo {
  color: red;
}

@media (min-width: 800px) {
  .foo {
    color: blue;
  }
}
```

이 방식은 미디어 쿼리의 중복을 야기한다는 말을 들으실지도 모릅니다. 그것은 분명한 사실입니다. 그러나, 실험에 따르면 Gzip(혹은 그에 상당하는 것) 이후에는 문제가 되지 않습니다.

> … 우리는 미디어 쿼리를 한 곳에 몰아넣는 것 혹은 산발적으로 배치하는 것이 성능에 영향을 미치는지에 대한 논의를 이어갔고, 압축 시, 최악의 경우 미세한 차이가 존재하며, 최선의 경우 기본적으로 차이가 존재하지 않는다는 결론에 이르렀다.  
> — Sam Richards, Breakpoint에 관해

정말로 미디어 쿼리의 중복이 신경 쓰인다면, [이 gem](https://github.com/aaronjensen/sass-media_query_combiner)과 같은 도구를 이용해 합칠 수 있습니다. 하지만 CSS 코드를 옮길 때 발생할 수 있는 부작용에 대해 경고해야 할 것 같습니다. 여러분은 소스의 순서가 중요하다는 사실을 잘 알고 있습니다.

## 변수

변수는 모든 프로그래밍 언어의 정수라고 할 수 있습니다. 복사를 반복하지 않고도 값을 재사용할 수 있게 해주죠. 가장 중요한 점은 값 수정을 매우 쉽게 만들어준다는 것입니다. 더이상 찾아서 바꾸기나 하나하나 고칠 필요가 없는 것입니다.

그러나 CSS는 우리의 달걀을 전부 담고 있는 커다란 바구니일 뿐입니다. 많은 언어들과는 다르게, CSS에는 실질적인 유효 범위가 없습니다. 이 때문에, 충돌을 목격할 위험을 무릅쓰고 변수를 추가할 때는 아주 주의를 기울여야 합니다.

타당한 상황에서만 변수를 만들라는 것이 제 조언입니다. 적절한 이유 없이는 변수를 선언하지 마세요. 도움이 되지 않을 것입니다. 새로운 변수는 다음의 기준이 충족될 때에만 생성되어야 합니다.

-   값이 적어도 두 번 반복된다;
-   값이 적어도 한 번은 수정될 가능성이 크다;
-   값의 실현은 모두 변수와 관련되어 있다(즉, 우연에 의한 것이 아니라).

기본적으로, 절대 수정될 일이 없거나 한 군데에서만 사용되는 변수를 선언하는 것에는 아무 의미가 없습니다.

### 스코프

Sass의 변수 스코프는 수년 동안 변화해왔습니다. 아주 최근까지, 규칙과 다른 스코프 내에서의 변수 선언은 기본적으로 지역적이었죠. 하지만 같은 이름의 전역 변수가 이미 존재하는 경우, 지역적 지정은 전역 변수의 값을 바꾸어버렸습니다. 버전 3.4 이후로, Sass는 이제 스코프 개념에 적절하게 대응하며 대신 새로운 지역 변수를 생성합니다.

문서를 보면 _전역 변수 가림shadowing_에 대한 부분이 있습니다. 전역 스코프에 이미 존재하는 변수를 내부 스코프(선택자, 함수, 믹스인…)에서 선언할 때, 지역 변수가 전역 변수를 _가린다_고 말합니다. 기본적으로, 지역 변수가 지역 스코프 내에서는 우선시됩니다.

다음의 코드 스니펫은 _변수 가림_ 개념을 설명하고 있습니다.

```
// 루트 수준에 전역 변수를 초기화합니다.
$variable: 'initial value';

// 전역 변수를 덮어쓰게 하는 믹스인을 만듭니다.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // 전역 변수를 가리는 지역 변수를 만듭니다.
  $variable: 'local value';

  // 믹스인 인클루드: 전역 변수를 덮어씁니다.
  @include global-variable-overriding;

  // 변수의 값을 출력합니다.
  // 전역 변수를 가리기 때문에, **지역** 변수의 값이 출력됩니다.
  content: $variable;
}

// 변수 가림이 없는 다른 선택자에서 변수를 출력합니다.
// 예상대로, **전역** 변수의 값이 출력됩니다.
.other-local-scope::before {
  content: $variable;
}
```

```
// 루트 수준에 전역 변수를 초기화합니다.
$variable: 'initial value'

// 전역 변수를 덮어쓰게 하는 믹스인을 만듭니다.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
  // 전역 변수를 가리는 지역 변수를 만듭니다.
  $variable: 'local value'

  // 믹스인 인클루드: 전역 변수를 덮어씁니다.
  +global-variable-overriding

  // 변수의 값을 출력합니다.
  // 전역 변수를 가리기 때문에, **지역** 변수의 값이 출력됩니다.
  content: $variable

// 변수 가림이 없는 다른 선택자에서 변수를 출력합니다.
// 예상대로, **전역** 변수의 값이 출력됩니다.
.other-local-scope::before
  content: $variable
```

### `!default` 플래그

라이브러리나 프레임워크, 그리드 시스템, 혹은 배포되어 외부의 개발자들에 의해 사용될 Sass 소품을 개발할 때는, 덮어쓰일 수 있도록 모든 환경설정 변수들을 `!default` 플래그를 붙여 정의하여야 합니다.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

이 덕분에, 개발자는 여러분의 라이브러리를 import하기 _전에_ 재정의될 걱정 없이 자신의 `$baseline` 변수를 정의할 수 있습니다.

```
// 개발자 자신의 변수
$baseline: 2em;

// `$baseline`를 선언하는 라이브러리
@import 'your-library';

// $baseline == 2em;
```

```
// 개발자 자신의 변수
$baseline: 2em

// `$baseline`를 선언하는 라이브러리
@import your-library

// $baseline == 2em
```

### `!global` 플래그

`!global` 플래그는 지역 스코프로부터 전역 변수를 정의할 때에만 사용되어야 합니다. 루트 레벨에서 변수를 정의할 때, `!global` 플래그는 생략되어야 합니다.

```
// Yep
$baseline: 2em;

// Nope
$baseline: 2em !global;
```

```
// Yep
$baseline: 2em

// Nope
$baseline: 2em !global
```

### 여러 개의 변수 혹은 맵

여러 개의 다른 변수들 대신 맵을 사용하는 것의 이점이 있습니다. 가장 중요한 것은 맵을 반복해서 순환하는 기능인데, 별개의 변수들로는 이것이 불가능합니다.

맵 사용의 또 다른 장점은 사용이 편리한 API를 제공하는 작은 getter 함수를 만드는 기능입니다. 다음의 Sass 코드를 예로 들 수 있습니다:

```
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

```
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @return map-get($z-indexes, $layer)
```

## Extend

`@extend` 지시어는 몇 년 전 Sass를 아주 유명하게 만든 기능 중 하나임에 틀림이 없습니다. 상기하자면, 이 기능은 마치 선택자 B에도 연결된 것처럼 요소 A를 꾸미라고 Sass에게 말하는 것을 가능하게 합니다. 말할 것도 없이 이는 모듈식 CSS를 작성할 때 가치 있는 협력자가 될 수 있습니다.

그러나, `@extend`의 진정한 목적은 규칙 간에 확장된 선택자 내에서 관계(제약 조건)를 유지하는 것입니다. 이것이 정확히 무슨 뜻일까요?

-   선택자에는 제약이 있다(예: `.foo > .bar`의 `.bar`에는 부모 `.foo`가 있어야 한다);
-   이러한 제약 조건은 확장하는 선택자로 전달된다(예: `.baz { @extend .bar; }`는 `.foo > .bar, .foo > .baz`를 생성한다);
-   확장된 선택자의 선언은 확장하는 선택자와 공유된다.

이를 감안할 때, 관대한 제약 조건으로 선택자를 확장하면 어떻게 선택자가 폭발할 수 있는지 쉽게 알 수 있습니다. `.baz .qux`가 `.foo .bar`를 확장하는 경우 결과 선택자는 `.foo .baz .qux` 또는 `.baz .foo .qux`가 될 수 있습니다. `.foo`와 `.baz`는 모두 일반 조상이기 때문입니다. 이는 부모, 조부모 등일 수도 있습니다.

항상 실제 선택자가 아닌 선택자 플레이스홀더로 관계를 정의하세요. 이렇게 하면 선택자에 대한 작명 관례를 자유롭게 사용(그리고 변경)할 수 있으며, 관계가 플레이스홀더 내에서 한 번만 정의되므로 의도하지 않은 선택자를 생성할 가능성이 훨씬 적어집니다.

스타일을 상속할 때, 확장하는 `.class` 또는 `%placeholder` 선택자가 확장된 선택자의 일종인 경우에만 `@extend`를 사용하십시오. 예를 들어, `.error`는 `.warning`의 일종이기 때문에, `.error`는 `@extend .warning`을 할 수 있습니다.

```
%button {
  display: inline-block;
  // … 버튼 스타일

  // 관계: %modal의 자식인 %button
  %modal > & {
    display: block;
  }
}

.button {
  @extend %button;
}

// Yep
.modal {
  @extend %modal;
}

// Nope
.modal {
  @extend %modal;

  > .button {
    @extend %button;
  }
}
```

```
%button
  display: inline-block
  // … 버튼 스타일

  // 관계: %modal의 자식인 %button
  %modal > &
    display: block

.button
  @extend %button

// Yep
.modal
  @extend %modal

// Nope
.modal
  @extend %modal

  > .button
    @extend %button
```

선택자의 확장이 유익하고 가치 있을 수 있는 상황도 있습니다. 주의하여 `@extend`할 수 있도록 항상 이러한 규칙을 명심하세요:

-   실제 선택자가 아닌, 주로 `%placeholders`에 확장을 사용하세요.
-   클래스를 확장할 때, [복잡한 선택자](https://www.w3.org/TR/selectors-4/#syntax)가 아닌 다른 클래스로만 클래스를 확장하세요.
-   직접적으로 `%placeholder`를 확장하는 것은 가능한 한 적게 하세요.
-   일반 조상 선택자 (예 : `.foo .bar`) 또는 일반 형제 선택자 (예 : `.foo ~ .bar`)를 확장하지 마세요. 이것이 선택자 폭발의 원인입니다.

`@extend`는 속성을 중복하지 않고 선택자를 합치기 때문에 파일 크기와 관련해서 도움이 된다고들 말합니다. 사실이긴 하지만, <a=”https://ko.wikipedia.org/wiki/Gzip”>Gzip</a=>으로 압축하게 되면 그 차이는 무시할 만한 정도입니다.

말인즉슨, 만약 Gzip(혹은 그에 상당하는 다른 방법)을 이용할 수 없는 경우, 자신이 뭘 하고 있는지 이해하는 한 `@extend` 접근법을 선택하는 것도 그렇게 나쁘진 않을 수도 있습니다.

### Extend 및 미디어 쿼리

동일한 미디어 범위(`@media` 지시문) 내에서만 선택자를 확장해야합니다. 미디어 쿼리를 또 다른 제약으로 생각하세요.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // 작동하지 않습니다. 더 나쁜 경우: 충돌합니다.
    @extend %foo;
  }
}

// Yep
@media print {
  .bar {
    @at-root (without: media) {
      @extend %foo;
    }
  }
}

// Yep
%foo {
  content: 'foo';

  &-print {
    @media print {
      content: 'foo print';
    }
  }
}

@media print {
  .bar {
    @extend %foo-print;
  }
}
```

```
%foo
  content: 'foo'

// Nope
@media print
  .bar
    // 작동하지 않습니다. 더 나쁜 경우: 충돌합니다.
    @extend %foo

// Yep
@media print
  .bar
    @at-root (without: media)
      @extend %foo

// Yep
%foo
  content: 'foo'

  &-print
    @media print
      content: 'foo print'

@media print
  .bar
    @extend %foo-print
```

저를 포함한 많은 개발자들이 반대하는 `@extend`의 이점과 문제에 대한 의견은 극도로 갈리는 것 같습니다. 다음 글에서 읽을 수 있습니다:

-   [Sass Extend에 대해 아무도 알려주지 않은 내용](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Extend를 피해야 하는 이유](https://www.sitepoint.com/avoid-sass-extend/)
-   [지나치게 Extend하지 마세요](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)

요약하자면, 선택자 내에서 관계를 유지하기 위해서만 `@extend`를 사용하는 것이 좋습니다. 두 개의 선택자가 특징적으로 유사하다면, 그것은 `@extend`의 완벽한 사용 예입니다. 관련이 없지만, 일부 규칙을 공유할 때는 `@mixin`이 더 적합 할 수 있습니다. [이 글](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)에서 둘 중에서 선택하는 방법에 대해 자세히 알아보세요.

## Mixins

믹스인은 Sass 언어 전체에서 가장 많이 사용되는 기능 중 하나이며, 재사용성과 DRY 컴퍼넌트의 핵심입니다. 그리고 거기엔 그럴 만한 이유가 있습니다: 믹스인은 작성자가 `.float-left` 같은 시맨틱하지 않은 클래스에 기대지 않고도 스타일시트 내내 재사용할 수 있는 스타일을 정의할 수 있게 해줍니다.

믹스인은 CSS 규칙과 Sass 문서에서 허용되는 거의 모든 것을 포함할 수 있습니다. 심지어 함수처럼 전달인자를 취할 수도 있습니다. 말할 것도 없이 가능한 일은 끝이 없습니다

하지만 믹스인의 힘을 남용하지 말라고 경고해야만 할 것 같습니다. 다시 한번 말하지만, 핵심은 _간결성_입니다. 거대한 로직을 가진 엄청나게 강력한 믹스인을 만들고 싶어질 수 있습니다. 이는 과설계over-engineering라고 하며 대부분의 개발자들이 이것 때문에 괴로워합니다. 여러분의 코드에 대해 너무 복잡하게 생각하지 말고, 무엇보다도 간단히 하세요. 만약 믹스인이 20줄을 넘어서게 되었다면, 더 작은 덩어리로 나뉘거나 완전히 수정되어야 합니다.

### 기본

믹스인은 아주 유용하며 아마 여러분도 사용하고 있을 겁니다. 대략적으로 이야기하자면, (우연이 아닌) 어떤 이유로 항상 같이 모습을 보이는 CSS 속성들의 그룹을 발견하게 되면, 그것들을 믹스인에 넣을 수 있습니다. 예를 들면 [Nicolas Gallagher의 마이크로 클리어픽스 핵](http://nicolasgallagher.com/micro-clearfix-hack/)은 (전달인자 없는) 믹스인 안에 들어갈 만합니다.

```
/// 내부 float을 해제하는 헬퍼
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

```
/// 내부 float을 해제하는 헬퍼
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix
  &::after
    content: ''
    display: table
    clear: both
```

다른 타당한 예로는 요소의 크기를 조절하는 믹스인이 있으며, `width`와 `height`를 동시에 정의합니다. 이는 코드 입력을 간단하게 만들 뿐만 아니라 쉽게 읽을 수 있도록 해 줍니다.

```
/// 요소 크기를 설정하는 헬퍼
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

```
/// 요소 크기를 설정하는 헬퍼
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
=size($width, $height: $width)
  width: $width
  height: $height
```

더 복잡한 믹스인의 예제를 보려면, [CSS 삼각형을 생성하기 위한 믹스인](https://www.sitepoint.com/sass-mixin-css-triangles/), [긴 그림자를 만들기 위한 믹스인](https://www.sitepoint.com/ultimate-long-shadow-sass-mixin/), 또는 [오래된 브라우저의 CSS 그라데이션 폴리필을 위한 믹스인](https://www.sitepoint.com/building-linear-gradient-mixin-sass/)을 살펴보세요.

### 전달인자 없는 믹스인

때때로 믹스인은 동일한 그룹의 선언이 반복되지 않도록 하기 위해서만 사용되지만, 매개 변수가 필요하지 않거나 충분한 기본값이 있으므로 반드시 전달인자를 줄 필요는 없습니다.

이럴 때는 호출할 때 괄호를 안전하게 생략할 수 있습니다. `@include` 키워드 (또는 들여쓰기 구문에서 `+` 기호)는 이미 해당 라인이 믹스인 호출임을 나타내는 지표 역할을 합니다; 여기에 추가 괄호는 필요하지 않아요.

```
// Yep
.foo {
  @include center;
}

// Nope
.foo {
  @include center();
}
```

```
// Yep
.foo
  +center

// Nope
.foo
  +center()
```

### 전달인자 리스트

믹스인에 들어가는 전달인자의 개수를 알 수 없을 때는, 리스트 대신 항상 `arglist`를 사용하세요. `arglist`는 임의의 수의 전달인자를 믹스인이나 함수에 전달할 때 암묵적으로 사용되는 Sass의 여덟 번째 데이터 유형이라고 생각할 수 있으며, `...`이 그 특징입니다.

```
@mixin shadows($shadows...) {
  // type-of($shadows) == 'arglist'
  // …
}
```

```
=shadows($shadows...)
  // type-of($shadows) == 'arglist'
  // …
```

몇 개의 전달인자(3개 혹은 그 이상)를 취하는 믹스인을 만들 때, 하나하나 넘겨주는 것보다 쉬울 거라는 생각으로 전달인자를 리스트나 맵으로 병합하기 전에 다시 생각해 보세요.

Sass는 사실 믹스인과 함수 선언에 재주가 있어서, 리스트나 맵을 함수/믹스인에 전달인자 리스트로 전달해 일련의 전달인자로 읽히도록 할 수 있습니다.

```
@mixin dummy($a, $b, $c) {
  // …
}

// Yep
@include dummy(true, 42, 'kittens');

// Yep but nope
$params: (true, 42, 'kittens');
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3));

// Yep
$params: (true, 42, 'kittens');
@include dummy($params...);

// Yep
$params: (
  'c': 'kittens',
  'a': true,
  'b': 42,
);
@include dummy($params...);
```

```
=dummy($a, $b, $c)
  // …

// Yep
+dummy(true, 42, 'kittens')

// Yep but nope
$params: (true, 42, 'kittens')
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3))

// Yep
$params: (true, 42, 'kittens')
+dummy($params...)

// Yep
$params: ('c': 'kittens', 'a': true, 'b': 42,)
+dummy($params...)
```

전달인자, 리스트 또는 전달인자 리스트 중 무엇을 사용하는 것이 가장 좋은지 여부에 대한 자세한 내용은 [SitePoint의 이 주제에 대한 멋진 부분](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/)을 참고해보세요.

### 믹스인과 벤더 프리픽스

지원이 미비하거나 부분적으로 지원되는 CSS 속성을 위한 벤더 프리픽스 처리용 믹스인을 정의하는 것은 솔깃한 일일 수 있습니다. 그러나 그건 좋은 생각이 아닙니다. 우선, [Autoprefixer](https://github.com/postcss/autoprefixer)를 사용할 수 있다면 Autoprefixer를 사용하세요. 여러분의 프로젝트에서 Sass 코드를 없애 주고, 항상 최신 정보를 반영하며, 프리픽스를 처리하는 데에는 여러분보다 훨씬 나을 것입니다.

불행하게도, Autoprefixer를 선택할 수 없는 상황도 있을 수 있죠. [Bourbon](https://bourbon.io/)이나 [Compass](http://compass-style.org/)를 사용하신다면, 둘 다 벤더 프리픽스를 처리하는 믹스인들을 제공한다는 것을 알고 계실 겁니다. 그것들을 사용하세요.

만약 Autoprefixer를 사용할 수 없고 Bourbon이나 Compass도 사용할 수 없다면, 오직 그런 경우에만, 여러분 스스로 CSS 속성에 프리픽스를 붙이는 믹스인을 만들어 사용할 수 있습니다. 하지만. 바라건대 속성마다 하나씩 믹스인을 만들어 각 벤더를 수동으로 출력하진 마세요.

```
// Nope
@mixin transform($value) {
  -webkit-transform: $value;
  -moz-transform: $value;
  transform: $value;
}
```

```
// Nope
=transform($value)
  -webkit-transform: $value
  -moz-transform: $value
  transform: $value
```

영리한 방식으로 하세요.

```
/// 벤더 프리픽스를 산출하는 믹스인 헬퍼
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - 프리픽스가 붙지 않은 CSS 속성
/// @param {*} $value - 가공되지 않은 CSS 값
/// @param {List} $prefixes - 산출할 프리픽스 리스트
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }

  #{$property}: $value;
}
```

```
/// 벤더 프리픽스를 산출하는 믹스인 헬퍼
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - 프리픽스가 붙지 않은 CSS 속성
/// @param {*} $value - 가공되지 않은 CSS 값
/// @param {List} $prefixes - 산출할 프리픽스 리스트
=prefix($property, $value, $prefixes: ())
  @each $prefix in $prefixes
    -#{$prefix}-#{$property}: $value

  #{$property}: $value
```

이 믹스인을 사용하는 것은 아주 간단합니다:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

이것은 조악한 해결책이라는 점을 명심하세요. 예를 들면, Flexbox에 필요한 것과 같은 복잡한 폴리필은 처리하지 못합니다. 그런 면에서, Autoprefixer를 사용하는 것이 훨씬 나은 선택입니다.

## 조건문

Sass가 `@if`와 `@else` 지시어를 통해 조건문을 제공한다는 것을 아마 알고 계실 겁니다. 여러분의 코드에 꽤 복잡한 논리를 갖고 있는 게 아니라면, 일상적인 스타일시트에선 조건문이 필요하지 않습니다. 사실, 조건문이 존재하는 가장 큰 이유는 라이브러리와 프레임워크입니다.

어쨌든, 조건문을 필요로 하게 된다면, 다음의 가이드라인을 준수하세요:

-   필요한 경우가 아니라면 괄호 없이;
-   `@if` 앞에는 빈 새 줄 하나;
-   여는 중괄호(`{`) 뒤에는 줄 바꿈;
-   `@else` 문은 이전의 닫는 중괄호(`}`)와 같은 줄에;
-   다음 줄이 닫는 중괄호(`}`)가 아닌 한 마지막 닫는 중괄호(`}`) 뒤에는 빈 새 줄 하나.

```
// Yep
@if $support-legacy {
  // …
} @else {
  // …
}

// Nope
@if ($support-legacy == true) {
  // …
}
@else {
  // …
}
```

```
// Yep
@if $support-legacy
  // …
@else
  // …

// Nope
@if ($support-legacy == true)
  // …
@else
  // …
```

거짓 값을 테스트할 때는, `false`나 `null` 대신 언제나 `not` 키워드를 사용하세요.

```
// Yep
@if not index($list, $item) {
  // …
}

// Nope
@if index($list, $item) == null {
  // …
}
```

```
// Yep
@if not index($list, $item)
  // …

// Nope
@if index($list, $item) == null
  // …
```

언제나 변수 부분을 조건문의 왼쪽에, 기대되는 (혹은 기대되지 않는) 결과를 오른쪽에 놓으세요. 거꾸로 된 조건문은, 특히 경험이 적은 개발자들이 읽기에 더 어렵습니다.

```
// Yep
@if $value == 42 {
  // …
}

// Nope
@if 42 == $value {
  // …
}
```

```
// Yep
@if $value == 42
  // …

// Nope
@if 42 == $value
  // …
```

어떤 조건에 따라 다른 결과를 반환하는 함수 안에서 조건문을 사용할 때는, 반드시 함수가 조건문 블록 밖에서도 `@return`문을 갖도록 만드세요.

```
// Yep
@function dummy($condition) {
  @if $condition {
    @return true;
  }

  @return false;
}

// Nope
@function dummy($condition) {
  @if $condition {
    @return true;
  } @else {
    @return false;
  }
}
```

```
// Yep
@function dummy($condition)
  @if $condition
    @return true

  @return false;

// Nope
@function dummy($condition)
  @if $condition
    @return true
  @else
    @return false
```

## 반복문

Sass는 [리스트](#section-30)와 [맵](#section-32) 같은 복잡한 데이터 구조를 제공하기 때문에, 작성자에게 그 개체들을 반복할 수 있는 방법 역시 준다는 사실은 놀랍지 않습니다.

하지만, 대체로 반복문의 존재는 아마도 Sass에 속하지 않는 어느 정도 복잡한 논리를 암시합니다. 반복문을 사용하기 전에, 합당한지 그리고 실제로 문제를 해결해 주는지 확인하세요.

### Each

`@each` 반복문은 분명 Sass가 제공하는 세 가지 반복문들 중에서 가장 많이 사용됩니다. 이 반복문은 리스트나 맵을 순환할 수 있는 깔끔한 API를 제공합니다.

```
@each $theme in $themes {
  .section-#{$theme} {
    background-color: map-get($colors, $theme);
  }
}
```

```
@each $theme in $themes
  .section-#{$theme}
    background-color: map-get($colors, $theme)
```

맵에서 반복할 때, 일관성을 강제하기 위해 언제나 `$key`와 `$value`를 변수 이름으로 사용하세요.

```
@each $key, $value in $map {
  .section-#{$key} {
    background-color: $value;
  }
}
```

```
@each $key, $value in $map
  .section-#{$key}
    background-color: $value
```

또한 가독성을 위해 이 가이드라인을 준수하세요:

-   `@each` 앞에 빈 새 줄;
-   다음 줄이 닫는 중괄호(`}`)가 아닌 한 닫는 중괄호(`}`) 뒤에 빈 새 줄.

### For

`@for` 반복문은 CSS의 `:nth-*` 가상 클래스와 결합되었을 때 유용할 수 있습니다. 이 시나리오를 제외하고는, 무언가에 반복문을 _사용해야만 한다면_ `@each` 반복문을 선택하세요.

```
@for $i from 1 through 10 {
  .foo:nth-of-type(#{$i}) {
    border-color: hsl($i * 36, 50%, 50%);
  }
}
```

```
@for $i from 1 through 10
  .foo:nth-of-type(#{$i})
    border-color: hsl($i * 36, 50%, 50%)
```

일반적인 관례를 따라 항상 `$i`를 변수 이름으로 사용하고, 정말로 좋은 이유가 있는 게 아니라면 `to` 키워드를 사용하지 마세요: 언제나 `through`를 사용하세요. 많은 개발자들이 Sass가 이 조합을 제공한다는 사실조차 모릅니다; 사용 시 혼란을 초래할 수 있습니다.

또한 가독성을 위해 이 가이드라인을 준수하세요:

-   `@for` 앞에 빈 새 줄;
-   다음 줄이 닫는 중괄호(`}`)가 아닌 한 닫는 중괄호(`}`) 뒤에 빈 새 줄.

### While

`@while` 반복문은 실제 Sass 프로젝트에서 전혀 용도가 없습니다. 특히 내부에서 반복문을 중단시킬 방법이 없기 때문입니다. **사용하지 마세요**.

## 경고와 오류

Sass 개발자들에 의해 간과되는 기능이 하나 있다면, 그것은 동적으로 경고와 오류를 출력하는 기능입니다. 사실, Sass에는 표준 출력 시스템(CLI, compiling app…)에 내용을 표시하는 세 가지의 지시어가 있습니다:

-   `@debug`;
-   `@warn`;
-   `@error`.

`@debug`는 분명히 SassScript 디버그를 위해 의도된 것이므로 제쳐두겠습니다. 그건 지금 우리에게 중요한 게 아니니까요. 그럼 이제 하나는 컴파일러를 멈춰 세우는 반면 다른 하나는 그렇지 않다는 점만 빼고 똑 닮은 `@warn`과 `@error`가 남았습니다. 무엇이 무엇인지 한 번 맞춰보세요.

Sass 프로젝트에는 경고와 오류의 여지가 많이 있습니다. 기본적으로 특정 유형의 전달인자를 기대하는 믹스인이나 함수는 뭔가가 잘못되었을 때 오류를 던지거나, 혹은 추정 시에는 경고를 표시합니다.

### 경고

[Sass-MQ](https://github.com/sass-mq/sass-mq)의 `px` 값을 `em`으로 변환하려 시도하는 이 함수를 예로 들겠습니다:

```
@function mq-px2em($px, $base-font-size: $mq-base-font-size) {
  @if unitless($px) {
    @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.';
    @return mq-px2em($px + 0px);
  } @else if unit($px) == em {
    @return $px;
  }
   @return ($px / $base-font-size) * 1em;
}
```

```
@function mq-px2em($px, $base-font-size: $mq-base-font-size)
  @if unitless($px)
    @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.'
    @return mq-px2em($px + 0px)
  @else if unit($px) == em
    @return $px
   @return ($px / $base-font-size) * 1em
```

만약 값에 단위가 없으면 이 함수는 그 값이 픽셀로 표현되어야 하는 것으로 추정합니다. 이 시점에서, 추정은 위험할 수 있으며 따라서 사용자는 소프트웨어가 예기치 않은 것으로 간주될 수 있는 행동을 했다는 경고를 받아야 합니다.

### 오류

오류는 경고와 달리 컴파일러의 진행을 막습니다. 기본적으로 오류는 컴파일을 멈추고 스택 트레이스와 출력 스트림에 메시지를 표시하는데, 이는 디버깅에 유용합니다. 이 때문에, 오류는 프로그램이 계속 실행될 방법이 없을 때 던져져야 합니다. 가능하면 이 문제를 피해 가려 노력하고 대신 경고를 표시하세요.

가령 특정 맵의 값에 접근하는 getter 함수를 만든다고 합시다. 만약 요청된 키가 맵에 존재하지 않으면 오류를 던질 수 있습니다.

```
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @if not map-has-key($z-indexes, $layer) {
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.';
  }

  @return map-get($z-indexes, $layer);
}
```

```
/// Z-index 맵. 어플리케이션의 Z 레이어들을 한데 모음.
/// @access private
/// @type Map
/// @prop {String} 키 - 레이어 이름
/// @prop {Number} 값 - 키에 연결된 Z 값
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// 레이어 이름으로부터 z-index 값을 가져온다.
/// @access public
/// @param {String} $layer - 레이어 이름
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @if not map-has-key($z-indexes, $layer)
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.'

  @return map-get($z-indexes, $layer)
```

`@error`를 효율적으로 사용하는 방법에 대한 자세한 내용은 [오류 처리에 대한 소개](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996)가 도움이 될 거예요.

## 도구

Sass처럼 인기 있는 CSS 전처리기의 좋은 점은 프레임워크, 플러그인, 라이브러리, 도구로 이루어진 완전한 생태계와 동반한다는 것입니다. 시작으로부터 8년이 지난 지금, 우리는 [Sass로 쓰일 수 있는 모든 것은 Sass로 쓰인](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/) 지점에 점점 더 가까워지고 있습니다.

하지만 제가 드리는 조언은 의존성의 수를 최소한으로 줄이라는 것입니다. 의존성을 관리하는 것은 여러분이 피해야 할 일종의 지옥입니다. 게다가, Sass의 경우 외부 의존성이 거의 혹은 전혀 필요하지 않습니다.

### Compass

[Compass](http://compass-style.org/)는 주요 Sass 프레임워크입니다. Sass의 핵심 디자이너 둘 중 한 명인 [Chris Eppstein](https://twitter.com/chriseppstein)에 의해 개발되었죠. 제 생각으로는 한동안은 그 인기가 크게 떨어질 것 같진 않습니다.

그렇지만, [전 더이상 Compass를 사용하지 않습니다](https://www.sitepoint.com/dont-use-compass-anymore/). 가장 큰 이유로는 Sass를 매우 느리게 만들기 때문입니다. Ruby Sass는 그 자체로도 꽤 느리기 때문에 그 위에 Ruby와 Sass를 더해서 좋을 게 없습니다.

문제는 우리가 전체 프레임워크에서 아주 적은 일부만을 사용한다는 점입니다. Compass는 거대합니다. 크로스 브라우저 호환 믹스인은 빙산의 일각에 불과하죠. 수학 함수, 이미지 헬퍼, 스프라이트… 이 훌륭한 소프트웨어를 가지고 할 수 있는 일이 너무나도 많습니다.

불행하게도, 이들은 모두 구문상 편의성syntactic sugar이며 킬러 기능이 존재하지 않습니다. _정말로 훌륭한_ 스프라이트 빌더는 예외가 될 수 있겠지만, [Grunticon](https://github.com/filamentgroup/grunticon)과 [Grumpicon](http://grumpicon.com/)도 같은 일을 잘 수행하며 빌드 프로세스에 삽입할 수 있다는 장점도 갖고 있습니다.

어쨌든, Compass의 사용을 금하진 않겠지만 추천하지도 않겠습니다. 특히 (그에 대한 노력이 있긴 하지만) LibSass와 호환이 되지 않기 때문입니다. 만약 사용하는 게 낫다 생각되면 사용하셔도 괜찮습니다. 하지만 결국에 거기서 많은 걸 얻지는 못할 것이라 생각합니다.

Ruby Sass는 현재 많은 함수와 믹스인을 가진 복잡한 로직의 스타일을 구체적으로 겨냥한 중요한 최적화 작업 중에 있습니다. 이는 Compass와 다른 프레임워크가 더이상 Sass의 속도를 늦추지 않을 수 있을 정도로 성능을 극적으로 향상시킬 것입니다.

### 그리드 시스템

어디에든 반응형 웹 디자인이 있는 만큼 그리드 시스템을 사용하는 것은 이제 필수가 되었습니다. 일관성 있고 탄탄한 디자인을 만들기 위해 우리는 요소를 배치하는 일종의 그리드를 사용합니다. 이 그리드를 반복해서 코딩하는 것을 피하기 위해, 몇몇 영리한 사람들은 그들의 그리드를 재사용이 가능하도록 만들었습니다.

솔직하게 말씀드릴게요: 전 그리드 시스템의 열렬한 팬은 아닙니다. 물론 그 가능성은 알고 있습니다만, 대부분은 너무 지나치고 주로 너드 디자이너들의 연단에서 흰 배경 위에 빨간 칼럼을 그리는 데 사용됩니다. 마지막으로 _정말-다행이야-2-5-3.1-π-그리드를-제작하는-이-툴이-있어서_ 라고 생각한 게 언제입니까? 맞습니다, 한 번도 생각한 적 없죠. 대부분의 경우, 복잡한 것이 아니라 평범하고 규칙적인 12 칼럼 그리드를 원할 뿐이니까요.

프로젝트에 [Bootstrap](https://getbootstrap.com/)이나 [Foundation](https://get.foundation/) 같은 CSS 프레임워크를 사용한다면 이미 그리드 시스템을 포함하고 있을 확률이 높습니다. 이 경우에는 또 다른 의존성을 피하기 위해 그것을 사용할 것을 추천합니다.

만약 여러분이 특정 그리드 시스템에 묶여 있지 않다면, 두 개의 아주 뛰어난 Sass 그리드 엔진이 있다는 사실에 기뻐하실 겁니다: [Susy](https://www.oddbird.net/susy/), [Singularity](https://github.com/at-import/Singularity). 둘 모두 여러분에게 필요한 것 이상을 제공하니 이 둘 중 맘에 드는 것을 고르시고 에지 케이스에도 잘 대응하는지 확인하세요. 제게 묻는다면, Susy가 좀 더 좋은 커뮤니티를 갖고 있습니다. 하지만 제 의견일 뿐입니다.

혹은 [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids) 같이 좀 더 가벼운 걸로 갈 수도 있습니다. 대부분의 경우, 뭘 선택하든 여러분의 코딩 스타일에 큰 영향을 미치진 않을 것이므로, 선택은 여러분에게 달렸습니다.

### SCSS-lint

코드 린트는 매우 중요합니다. 대개 스타일가이드의 가이드라인을 따르는 것이 코드 품질 실수를 줄이도록 도와주지만 누구도 완벽할 순 없고 개선의 여지는 항상 존재합니다. 코드 린트는 주석만큼 중요하다고 할 수 있습니다.

[SCSS-lint](https://github.com/causes/scss-lint)는 여러분의 SCSS 파일을 깔끔하고 읽기 좋게 유지하도록 돕는 도구입니다. 필요에 꼭 맞게 설정할 수 있고 여러분의 도구들과 쉽게 통합할 수 있습니다.

다행히도, SCSS-lint 권고는 이 문서에서 설명한 것과 유사합니다. Sass Guidelines에 따라 SCSS-lint를 구성하기 위해, 다음의 설정을 추천합니다:

```
linters:

  BangFormat:
    enabled: true
    space_before_bang: true
    space_after_bang: false

  BemDepth:
    enabled: true
    max_elements: 1

  BorderZero:
    enabled: true
    convention: zero

  ChainedClasses:
    enabled: false

  ColorKeyword:
    enabled: true

  ColorVariable:
    enabled: false

  Comment:
    enabled: false

  DebugStatement:
    enabled: true

  DeclarationOrder:
    enabled: true

  DisableLinterReason:
    enabled: true

  DuplicateProperty:
    enabled: false

  ElsePlacement:
    enabled: true
    style: same_line

  EmptyLineBetweenBlocks:
    enabled: true
    ignore_single_line_blocks: true

  EmptyRule:
    enabled: true

  ExtendDirective:
    enabled: false

  FinalNewline:
    enabled: true
    present: true

  HexLength:
    enabled: true
    style: short

  HexNotation:
    enabled: true
    style: lowercase

  HexValidation:
    enabled: true

  IdSelector:
    enabled: true

  ImportantRule:
    enabled: false

  ImportPath:
    enabled: true
    leading_underscore: false
    filename_extension: false

  Indentation:
    enabled: true
    allow_non_nested_indentation: true
    character: space
    width: 2

  LeadingZero:
    enabled: true
    style: include_zero

  MergeableSelector:
    enabled: false
    force_nesting: false

  NameFormat:
    enabled: true
    convention: hyphenated_lowercase
    allow_leading_underscore: true

  NestingDepth:
    enabled: true
    max_depth: 1

  PlaceholderInExtend:
    enabled: true

  PrivateNamingConvention:
    enabled: true
    prefix: _

  PropertyCount:
    enabled: false

  PropertySortOrder:
    enabled: false

  PropertySpelling:
    enabled: true
    extra_properties: []

  PropertyUnits:
    enabled: false

  PseudoElement:
    enabled: true

  QualifyingElement:
    enabled: true
    allow_element_with_attribute: false
    allow_element_with_class: false
    allow_element_with_id: false

  SelectorDepth:
    enabled: true
    max_depth: 3

  SelectorFormat:
    enabled: true
    convention: hyphenated_lowercase
    class_convention: '^(?:u|is|has)\-[a-z][a-zA-Z0-9]*$|^(?!u|is|has)[a-zA-Z][a-zA-Z0-9]*(?:\-[a-z][a-zA-Z0-9]*)?(?:\-\-[a-z][a-zA-Z0-9]*)?$'

  Shorthand:
    enabled: true

  SingleLinePerProperty:
    enabled: true
    allow_single_line_rule_sets: false

  SingleLinePerSelector:
    enabled: true

  SpaceAfterComma:
    enabled: true

  SpaceAfterPropertyColon:
    enabled: true
    style: one_space

  SpaceAfterPropertyName:
    enabled: true

  SpaceAfterVariableColon:
    enabled: true
    style: at_least_one_space

  SpaceAfterVariableName:
    enabled: true

  SpaceAroundOperator:
    enabled: true
    style: one_space

  SpaceBeforeBrace:
    enabled: true
    style: space
    allow_single_line_padding: true

  SpaceBetweenParens:
    enabled: true
    spaces: 0

  StringQuotes:
    enabled: true
    style: single_quotes

  TrailingSemicolon:
    enabled: true

  TrailingZero:
    enabled: true

  TransitionAll:
    enabled: false

  UnnecessaryMantissa:
    enabled: true

  UnnecessaryParentReference:
    enabled: true

  UrlFormat:
    enabled: false

  UrlQuotes:
    enabled: true

  VariableForProperty:
    enabled: false

  VendorPrefixes:
    enabled: true
    identifier_list: base
    include: []
    exclude: []

  ZeroUnit:
    enabled: true
```

SCSS-lint를 사용해야 한다는 확신이 없다면, 다음 훌륭한 글들을 읽는 것을 추천합니다: [SCSS-lint를 사용하여 Sass를 정리하세요](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/), [theguardian.com의 Sass 코드 품질 개선](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom), [자동 수행 가능한 SCSS 스타일 가이드](https://davidtheclark.com/scss-lint-styleguide/).

SCSS lint를 Grunt 빌드 프로세스에 추가하고 싶으시다면, 기쁘게도 [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint)라고 하는 Grunt 플러그인이 있습니다.

또한, SCSS-lint와 함께 작동하는 깔끔한 어플리케이션을 찾고 계신다면, [Thoughtbot](https://thoughtbot.com/)(Bourbon, Neat…)이 [Hound](https://houndci.com/)에 공을 들이고 있습니다.

## 너무 길어서 안 읽은 분들을 위해

이 가이드라인은 정말 길며 때로는 더 짧은 버전으로 요약하는 것이 좋습니다. 다음은 이 요약입니다.

### 핵심 원칙

-   스타일가이드가 있는 이유는 **일관성**이 전부입니다. Sass 가이드라인의 일부 규칙에 동의하지 않더라도, 일관성이 있는 한 충분히 타당합니다.
-   Sass는 가능한 한 단순하게 유지해야 합니다. 꼭 필요한 경우가 아니면 복잡한 시스템을 구축하지 마세요.
-   때로는 _KISS_ (Keep It Simple, Stupid)가 _DRY_ (Don’t Repeat Yourself)보다 우선한다는 점을 명심하세요.

### 구문 & 서식

-   들여쓰기는 탭 없이 두(2) 개의 공백으로 합니다.
-   줄은 가능한 한 80자보다 짧아야 합니다. 필요한 경우 여러 줄로 자유롭게 나누세요.
-   CSS는 해리 로버츠의 [CSS 가이드라인](https://cssguidelin.es)에 따라 올바르게 작성되어야 합니다.
-   공백은 자유롭게 항목, 규칙 및 선언을 구분하는 데 사용합니다. 빈 줄을 남기는 것을 주저하지 마세요. 다치지 않아요.

#### 문자열

-   스타일시트의 맨 위에 `@charset` 지시문을 선언하는 것을 적극적으로 추천합니다.
-   CSS 식별자로 적용되지 않는 한, 문자열은 작은따옴표를 사용하여 인용되어야 합니다. URL도 마찬가지입니다.

#### 숫자

-   Sass는 숫자, 정수, 부동 소수점을 구분하지 않으므로 뒤따르는 0은 생략해야 합니다. 그러나 앞장서는 영(0)은 가독성에 도움이 되므로 추가해야 합니다.
-   길이가 영(0)이면 단위가 없어야 합니다.
-   단위 조작은 문자열 연산이 아닌 산술 연산으로 생각해야 합니다.
-   가독성을 높이기 위해 최상위 계산은 괄호로 묶어야 합니다. 또한, 복잡한 수학 연산은 더 작은 덩어리로 나눌 수 있습니다.
-   매직넘버는 코드 유지 관리를 크게 해치므로 항상 피해야합니다. 의심스러울 때는, 의심스러운 값을 광범위하게 설명하세요.

#### 색

-   색은 가능하면 HSL, RGB, 16진수(소문자 및 축약형) 순으로 표현해야 합니다. 색 키워드는 피해야 합니다.
-   색상을 밝게 하거나 어둡게 할 때는 `darken(..)` 이나 `lighten(..)` 대신 `mix(..)`를 선호합니다.

#### 리스트

-   공백으로 구분된 CSS 값에 대한 직접 매핑으로 사용되지 않는 한, 리스트는 쉼표로 구분해야 합니다.
-   가독성을 높이기 위해 괄호로 감싸는 것도 고려해야 합니다.
-   한 줄의 리스트에는 뒤따르는 쉼표가 없어야 하며, 여러 줄의 리스트에는 있어야 합니다.

#### 맵

-   한 쌍 이상을 포함하는 맵은 여러 줄에 기록합니다.
-   유지 관리를 돕기 위해, 맵의 마지막 쌍에 뒤따르는 쉼표가 있어야 합니다.
-   문자열인 맵 키는 다른 문자열처럼 작은따옴표로 감쌉니다.

#### 선언 정렬

-   선언 정렬 (알파벳 순, 유형별 등)에 사용되는 시스템은 일관성만 있다면 중요하지 않습니다.

#### 선택자 내포

-   필요하지 않다면(대부분의 경우가 이러함) 선택자 내포를 피하세요.
-   가상 클래스 및 가상 요소에 선택자 내포를 사용합니다.
-   미디어 쿼리는 관련 선택자 내에 내포될 수도 있습니다.

### 작명 관례

-   소문자와 하이픈으로 구분된 CSS 작명 관례(몇 가지 오류 제외)를 따르는 것이 가장 좋습니다.

### 주석

-   CSS는 까다로운 언어입니다; 의심스러운 것(또는 수상한 것)에 대해 매우 광범위한 주석을 작성하는 것을 주저하지 마세요.
-   공용 API를 설정하는 변수, 함수, 믹스인 및 플레이스홀더에는\` SassDoc 주석을 사용합니다.

### 변수

-   안전하게 변경할 수 있는 공용 API의 모든 변수 부분에 `!default` 플래그를 사용하세요.
-   `!global` 플래그는 향후 Sass 문법 위반이 될 수 있으므로 루트 레벨에서 사용하지 마세요.

### Extend

-   기존의 CSS 선택자가 아닌 확장 플레이스홀더에 충실하세요.
-   부작용을 방지하기 위해 플레이스홀더를 가능한 한 적게 확장하세요.
