### 1. 팀원 정보 및 업무 분담 내역

* 팀장 : 이예진 // 팀원 : 서유진

* 업무 분담 내역
  
  * 저희는 이번 프로젝트를 통해 그간 배운 내용들을 복기하기 위해 기획부터 백엔드와 프론트엔드 모든 요소들을 함께 작성하였습니다.
  * 뒤로 갈수록 시간이 부족하여 알고리즘은 이예진, 전반적인 디자인은 서유진이 맡아서 진행했습니다.

### 2. 목표 서비스 구현 및 실제 구현 정도

* 목표 서비스 구현 (커뮤니티에 더 중점을 둠)
  
  * 백엔드 : 유저간 팔로잉 팔로우, 로그인시 설정할 닉네임과 닉네임 수정, 리뷰와 댓글 작성 기능, 영화와 리뷰와 댓글에 달 좋아요 기능, 프로필 이미지 업로드 및 수정, 
  
  * 프론트 : 다크모드

* 실제 구현 정도
  
  * 백엔드 : 전부 다 구현, 장고 dj-rest-auth 의 기본 회원가입 폼 수정(닉네임 필드 추가), 홈 화면에 유저들이 가장 많이 좋아요를 누른 영화 추천 같이 띄우기,
    유저들간의 소통 DB를 기반으로한 알고리즘 추천까지 구현했습니다.
  
  * 프론트 : 디자인(다크모드 등), 미리 기획해둔 모든 기능을 구현했습니다.

### 3. ERD 및 Component Architecture

![Model_ERD.png](https://user-images.githubusercontent.com/109276824/222263297-b6236724-3a58-4b0d-8124-152d10471ce6.png)

![Comp_ERD.png](https://user-images.githubusercontent.com/109276824/222263637-eafd00da-3a41-4cf0-bc55-5ae5cc68f35d.png)

    

### 4. 영화 추천 알고리즘

1. 내가 팔로우한 사람들이 평점을 가장 높게 준 영화들 순서대로 추천 페이지에 출력
   
   * 추천 페이지가 created되는 시점에 recommend 함수를 실행하여 현재 DB에 저장된 movies를 가져와 그 배열 크기만큼 counting 배열을 만든다.
   
   * 현재 로그인 되어있는 유저정보에서 팔로잉 목록이 비어있을 경우 팔로잉 정보가 없다는 창을 띄운다
   
   * 팔로잉이 있을 경우 팔로잉 배열을 for문으로 돌며 얻은 팔로잉의 id로, 해당하는 팔로잉 유저의 프로필을 가져온다
   
   * 팔로잉 유저의 유저정보를 가져와 유저의 리뷰들을 따로 저장해두고, 또 그 리뷰들을 for문을 돈다. 각각의 리뷰가 달린 영화pk를 인덱스로 카운트배열에 점수를 더해준다.
   
   * 리뷰의 별이 5개이면 2점을 더하고, 리뷰의 별이 1개면 -2 점으로 순차적으로 점수를 매긴다.
   
   * 카운트 배열을 내림차순으로 정렬(점수가 가장 높은 영화 10개를 출력)하고 그에 해당하는 인덱스(영화pk)를 받은 리스트 생성.
   
   * 새리스트 상단 10개 안에 값 0 (해당 pk 존재 X)이 있을 경우, 0을 지운 새로운 배열 출력.

2. 웹을 이용하는 유저들이 좋아요를 가장 많이 누른 영화들을 홈에 출력
   
   * 홈이 created되는 시점에 영화 리스트를 불러오는 getMovieList() 함수를 실행하여 data에 필요한 영화 정보들 저장
   - 자식 Component에 v-for로 영화를 하나씩 내려보내준다
   
   - props로 부모로부터 영화를 받은 자식 컴포넌트에서 장고에서 미리 시리얼라이저로 꺼내둔 like_users를 가져온다.
   
   - like_users는 배열이므로 .length가 0이면 팔로잉이 없는 것 -> 팔로잉이 없다는 텍스트를 띄운 창 출력
   
   - 0이 아니면 좋아요를 유저들로부터 가장 많이 받은 영화들을 차례대로 출력

### 5. 서비스 대표 기능

* 영화에 대한 후기를 작성하고 그에 대한 댓글을 남겨 유저끼리 소통한다.
* 후기가 본인과 잘 맞는 유저라면 팔로우하고 나의 팔로잉이 모여 팔로잉 유저들이 리뷰점수를 높게 준 영화들을 추천받는다. 

### 7. 시연영상

[Movsha 시연영상 - YouTube](https://youtu.be/7E0ob7r0SdM)

### 6. 느낀점

* 서유진
  
  처음엔 자신만만하게 시작하여 에러의 벽에 한 수백 번은 부딪혔습니다. 그러다보니 평소에 그냥 안 되나 보다~ 하고 넘겼던 작은 코드들이 왜 안 되는지, 어떻게 써야 맞는 건지 좀 더 명확하게 알게 되었고, 그럴 때마다 굉장히 뿌듯했습니다. 또, 페어와 우스갯소리로 통과만 하는 게 목표라 하면서도 열정 넘치는 성향이 비슷해, 매일을 밤새가며 같이 페이지를 하나하나 만드니 서로서로 의지가 되어 좋았습니다. 이제까지 장고와 뷰를 마냥 헛되게 배운 것만은 아닌 것 같다는 생각도 조금이나마 들었습니다. 이전에 자룡쌤과 프로젝트들을 할 때 꼭 정리해두고 끝까지 갖고 가라고 하셨던 말씀이 완전히 납득가는 프로젝트였습니다. 자룡쌤한테 배운 장고, 뷰 프로젝트 파일들 야무지게 쓰며 하나하나 제 힘으로 진행하니 하루하루 성장하고 속도가 붙는 것이 느껴졌습니다. 비록 잠은 굉장히 부족하지만 인생에 있어서 다섯 손가락 안에 들 정도로 뿌듯한 경험이었습니다. 프로젝트를 진행하기 전엔 개발자가 제 길이 아닌 것 같다는 생각이 계속 들었는데, 이번 프로젝트를 하며 어쩌면 나랑 잘 맞을 수도 있겠단 생각이 들었고 더 더 많이 공부해서 더 잘하고 싶습니다. 그리고 같이 프로젝트 진행한 언니와 끝나고나서 코드들 깔끔하게 정리하고, 배포까지 해보려 합니다. 제 작고 소중한 첫 자립 프로젝트,, 비록 반응형이 됐다 말았다 해서 조금 안쓰러운 프로젝트지만 여러모로 많이 배우고 재미있었습니다.

* 이예진
  
  싸피에 들어온지 6개월, 코딩이라는 것을 배운지도 이제 막 6개월. 굉장히 많은 것을 배웠지만 그간 배운 것들을 전부 가지고 하나의 서비스를 만들어야한다는 것이 막막하고 어렵기만 했습니다. 걱정도 너무 많이 되었고 막막했지만, 열정적이고 같이 즐겁게 구현하고자하는 목표를 위해 밤낮가리지않고 달릴 수 있는 팀원을 만나 너무 다행이고 기뻤습니다.
  백과 프론트에 대한 기본적인 정의만 알지 확실히 어떤 부분을 담당하고 무슨 문제를 고려해야하는 직무인지 전혀 감이 오지 않았었는데, 이번 프로젝트에서 처음부터 유진이와 우리 둘다 백/프론트 아직 확실히 정한 파트가 없으니 이번 기회에 모두 제대로 경험해보자고 얘기를 하고 시작했고 그 덕분에 정말로 백과 프론트가 각각 어떤부분을 고려해야하고 서로 어떤식의 연관이 있고 데이터를 주고 받는지 어렴풋했던 개념들이 확실히 잡히는 프로젝트였습니다. 실제로 프로젝트를 절반이상 진행해보고 나니 교수님께서 말씀하셨던 기획단계에서의 모델ERD 구상과 컴포넌트 설계도 구상이 정말 중요하다라는 것이 무슨 말씀이신지 알게 되었고 초반 모델과 컴포넌트, serializer 구조에 함께 시간배분을 많이 했던 덕분에 우리 팀은 많은 변동없이 초기 설계대로 잘 구현된 것 같습니다. 심지어 프로젝트를 진행하면서 필요하다고 생각되는 기능이나 간단히 추가할 수 있겠다고 생각된 기능들을 기존에 잘 구성해놓은 serializer와 컴포넌트 덕분에 전부 다 구현 가능했습니다. 뿌듯했습니다.
  처음 백지에서 프로젝트를 시작할 때는 코드 하나하나 다 어색하고 머릿 속에 그림도 잘 안그려졌지만, 프로젝트가 끝날 때 쯤이 되니 완전히 오천배는 더 성장했다는게 스스로도 느껴질 정도입니다. 첫 서비스 첫 프로젝트 정말 아직도 하루만 더 있었다면 반응형도 해보고 배포도 했을텐데 라는 아쉬움이 많이 남지만 그보다 자랑스럽고 기쁜 마음이 더 큽니다!  
