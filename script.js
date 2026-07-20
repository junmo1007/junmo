function switchTab(tabId, btnElement) {
    document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
    document.getElementById('view-' + tabId).classList.add('active');
    
    if(btnElement) {
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    if(tabId === 'chatbot') {
        document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
    }
    if(tabId === 'profile' && btnElement) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if(loggedInUser) loadProfile(loggedInUser);
    }
}

// ==========================================
// 🏫 천안상고 데이터베이스 (여기에 내용을 계속 추가하세요!)
// ==========================================
// ==========================================
// 🏫 천안상고 데이터베이스 (AI 챗봇용)
// ==========================================
const schoolData = {
    
  "school_identity": {
    "name": "천안상업고등학교 (Cheonan Commercial High School)",
    "established": "1973년 3월 5일",
    "type": "특성화고등학교",
    "gender": "남녀 공학",
    "form": "사립",
    "foundation": "천일학원",
    "philosophy": { "motto": "성실, 근면, 봉사" },
    "symbols": { "flower": "장미", "tree": "은행나무" },
    "statistics": { "students": "792명 (2023학년도 기준)", "teachers": "104명 (2023학년도 기준)" },
    "location": "충청남도 천안시 서북구 천일고1길 43-9 (신당동)",
    "office_of_education": "충청남도교육청"
  },
  "departments_detailed": {
    "사무회계과": {
      "note": "도제반 2학급 포함",
      "vision": "회계 및 세무, 사무 관리, 금융 관련 이론을 통한 기업 맞춤형 회계 금융 실무 능력을 갖춘 전문 인력 양성",
      "career_and_certs": "금융 관련 자격증, 전산회계, 기업회계, 전산세무, FAT 자격증 등 취득 후 금융기관, 공기업, 대기업, 강소기업 사무직 취업",
      "special_program": "도제사업 운영 일학습병행"
    },
    "물류유통과": {
      "vision": "충청권 대규모 유통업체 및 물류센터 수요 증대에 따른 지방화, 정보화 시대 물류유통 전문가 양성을 목적으로 실무 중심의 교육 실시",
      "curriculum": "유통일반, 마케팅과 광고, 사무행정, 전자상거래실무, 빅데이터분석, 물류관리, 매장판매, 유통관리, 고객관리, 창업일반 등",
      "career_and_certs": "ERP물류관리사, 유통관리사, 생산관리사, 인사관리사, 지게차운전기능사 자격증 등 취득 후, 천안산업단지 및 대규모 유통센터 관리직 취업"
    },
    "광고미디어디자인과": {
      "vision": "소셜 미디어 마케팅, 모바일 마케팅, 데이터 마케팅 등 디지털 마케팅으로 변화하는 미래를 준비하는 전문 인력 양성",
      "curriculum": "웹프로그래밍, 디자인일반, 컴퓨터그래픽, 조형, 색채디자인, 영상제작, 광고콘텐츠제작, 영상그래픽, 애니메이션콘텐츠 제작, 캐릭터제작, 시각디자인 등",
      "career_and_certs": "GTQ포토샵, GTQ일러스트, 컬러리스트, 컴퓨터그래픽스 운용기능사 등 취득 후 각종 방송관련 제작자, 시각정보디자이너, 컬러리스트, 방송편집기사 관련 업체 취업",
      "special_program": "미래유망분야 인력양성사업선정 - 연 9000만원 지원"
    },
    "소프트웨어개발과": {
      "vision": "4차 산업혁명시대에 필요한 소프트웨어개발자, 웹프로그래머 양성",
      "curriculum": "인공지능프로그래밍, 웹프로그래머, 웹프로그래밍, 네트워크 프로그래밍, 데이터베이스 엔지니어링, 빅데이터분석, 캐릭터제작, 응용SW엔지니어링, 스마트 문화 앱 콘텐츠 제작 등",
      "career_and_certs": "정보처리기능사, 정보기기운용기능사, 정보처리기사, 기술프로젝트관리전문가 자격증 취득 후 SW개발자, 웹프로그래머, 스마트폰앱개발자 관련 업체 취업",
      "special_program": "미래유망분야 인력양성사업선정 - 연 9000만원 지원"
    }
  },
  "lunchMenu_July2026": {
    "14": "영양 흑미밥, 얼갈이배추된장국, 양배추찜, 아삭고추무침, 어묵볶음, 돈목살구이, 보쌈김치",
    "20": "급식 데이터가 아직 업데이트되지 않았습니다."
  }
};
let globalUserDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
if (!globalUserDB['천안상고_official']) {
    globalUserDB['천안상고_official'] = {
        password: 'admin',
        name: '천안상업고등학교',
        bio: '성실(Sincerity), 근면(Diligence), 봉사(Service)<br>🏫 천안상고 공식 계정입니다.',
        pic: '로고/천상.jpg',
        followers: [],
        following: []
    };
    localStorage.setItem('instaUserDB', JSON.stringify(globalUserDB));
}

let pcChatHistory = [];
try {
    pcChatHistory = JSON.parse(localStorage.getItem('pcChatHistory')) || [];
} catch (e) {
    pcChatHistory = [];
}
let pcCurrentSessionId = Date.now();

function resetChat() {
    if(confirm("현재 대화 내용을 모두 지우고 처음부터 다시 시작하시겠습니까?")) {
        document.getElementById('chatBox').innerHTML = `
            <div class="message bot-message">
                <div class="chat-bot-icon" style="width:30px; height:30px; font-size:14px;">🏫</div>
                <div class="message-text">안녕하세요! 천안상고 AI 챗봇입니다.<br>학교 기본 정보나 학과에 대해 궁금한 점을 메시지로 보내주세요!</div>
            </div>`;
        pcCurrentSessionId = Date.now();
    }
}

function saveChatToLocal() {
    const chatBox = document.getElementById('chatBox');
    const userMessages = chatBox.querySelectorAll('.user-message .message-text');
    if(userMessages.length === 0) return;
    let lastMsg = userMessages[userMessages.length - 1].innerText;
    let previewText = lastMsg.substring(0, 20) + (lastMsg.length > 20 ? '...' : '');
    let existingIdx = pcChatHistory.findIndex(s => s.id === pcCurrentSessionId);
    
    if (existingIdx >= 0) {
        pcChatHistory[existingIdx].html = chatBox.innerHTML;
        pcChatHistory[existingIdx].preview = previewText;
    } else {
        pcChatHistory.unshift({ id: pcCurrentSessionId, preview: previewText, html: chatBox.innerHTML });
    }
    localStorage.setItem('pcChatHistory', JSON.stringify(pcChatHistory));
}

function toggleHistory() {
    const panel = document.getElementById('historyPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        const list = document.getElementById('historyList');
        list.innerHTML = '';
        if(pcChatHistory.length === 0) {
            list.innerHTML = '<div style="color:#8e8e8e; text-align:center; padding-top:20px;">저장된 대화 기록이 없습니다.</div>';
            return;
        }
        pcChatHistory.forEach(session => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerText = "🗣️ " + session.preview;
            item.onclick = () => {
                pcCurrentSessionId = session.id;
                document.getElementById('chatBox').innerHTML = session.html;
                toggleHistory();
                document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
            };
            list.appendChild(item);
        });
    } else {
        panel.style.display = 'none';
    }
}

function sendQuickMsg(text) { document.getElementById('userInput').value = text; sendMessage(); }

// ==========================================
// 🤖 챗봇 Gemini API 통신
// ==========================================
async function sendMessage() {
    const input = document.getElementById('userInput');
    const userText = input.value.trim();
    if (!userText) return;

    const chatBox = document.getElementById('chatBox');
    chatBox.insertAdjacentHTML('beforeend', `<div class="message user-message"><div class="message-text">${userText}</div></div>`);
    input.value = '';
    saveChatToLocal();
    
    const botDiv = document.createElement('div'); 
    botDiv.className = 'message bot-message';
    botDiv.innerHTML = '<div class="chat-bot-icon" style="width:30px; height:30px; font-size:14px;">🏫</div><div class="message-text" style="color: #aaa;">🤔 타이핑 중...</div>';
    chatBox.appendChild(botDiv); 
    const botText = botDiv.querySelector('.message-text'); 
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // ✨ 여기에 본인의 Gemini API 키를 다시 입력해주세요!
        const GEMINI_API_KEY = "AQ.Ab8RN6JISJ2Qlx9CYNTrTCme5j8jzBeh0C81BrAFg_1_v9pbNw"; 
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const systemPrompt = `
너는 천안상업고등학교(천안상고)를 안내하는 친절한 AI 챗봇 'S-Log 도우미'야. 
오늘 날짜는 2026년 7월 20일이야.

[지시사항]
1. 급식(메뉴, 오늘 급식 등)과 관련된 질문을 받으면 무조건 "급식내용은 급식표 탭에서 확인해주세요!"라고 답변해줘.
2. 교칙과 관련된 질문을 받으면 "교칙 관련 상세 정보는 학교 홈페이지나 교무실을 통해 확인해주세요."라고 답변해줘.
3. 그 외 학교 정보나 학과에 대한 질문은 아래 데이터베이스 정보를 바탕으로 친절하게 답변해줘.
4. 없는 정보는 모른다고 솔직하게 말해.

[천안상고 데이터베이스]
${JSON.stringify(schoolData, null, 2)}

[학생의 질문]
${userText}
`;

        const response = await fetch(API_URL, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: systemPrompt }]
                }]
            })
        });

        if (!response.ok) { 
            botText.innerHTML = `🚨 서버 에러 (상태 코드: ${response.status})`; 
            return; 
        }

        const data = await response.json();
        let replyText = data.candidates[0].content.parts[0].text;

        botText.innerHTML = replyText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
        botText.style.color = "#333";
        chatBox.scrollTop = chatBox.scrollHeight;
        
        saveChatToLocal();
    } catch (e) { 
        botText.innerHTML = "🚨 API 연결에 실패했습니다. API 키나 인터넷 연결을 확인해주세요."; 
        console.error("API 연동 에러:", e);
    }
}

// ==========================================
// 📱 홈 피드 데이터베이스
// ==========================================
const initialFeedData = [
    { 
        id: 'post_1',
        author: '천안상고_official',
        title:'',
        media: [
            { type: 'image', src: 'assets/feed&reel-1/feed-1.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-2.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-3.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-4.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-5.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-6.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-8.jpg' },
            { type: 'video', src: 'assets/feed&reel-1/reel-1.mp4' },
            { type: 'image', src: 'assets/feed&reel-1/feed-9.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-11.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-12.jpg' },
            { type: 'image', src: 'assets/feed&reel-1/feed-13.jpg' },
            { type: 'video', src: 'assets/feed&reel-1/reel-2.mp4' },
            { type: 'image', src: 'assets/feed&reel-1/feed-7.jpg' },
            { type: 'video', src: 'assets/feed&reel-1/reel-3.mp4' },
        ], 
        text: '천상크루🪽 학교 홍보영상 촬영 중📸<br>현장 분위기 살짝 공개✨<br>영상은 곧 공개되니 많은 기대와 관심 부탁드려요!', 
        likes: 120 
    },
    { 
        id: 'post_2',
        author: '천안상고_official',
        title: '',
        media: [
            { type: 'image', src: 'assets/feed&reel-2/feed-1.jpg' },
            { type: 'image', src: 'assets/feed&reel-2/feed-2.jpg' },
            { type: 'image', src: 'assets/feed&reel-2/feed-3.jpg' },
            { type: 'image', src: 'assets/feed&reel-2/feed-4.jpg' },
            { type: 'image', src: 'assets/feed&reel-2/feed-5.jpg' },
            { type: 'video', src: 'assets/feed&reel-2/reel-1.mp4' }
        ], 
        text: '천안상업고등학교 홍보단의 촬영은 계속 됩니다~ 💙', 
        likes: 342 
    }
];

let feedDB = [];
try {
    let parsedFeed = JSON.parse(localStorage.getItem('instaFeedDB'));
    if (Array.isArray(parsedFeed)) feedDB = parsedFeed;
} catch (e) { console.error("피드 데이터 로드 오류", e); }

if (feedDB.length === 0) {
    feedDB = initialFeedData.map(post => ({ ...post, comments: [], likedBy: [] }));
    localStorage.setItem('instaFeedDB', JSON.stringify(feedDB));
} else {
    feedDB.forEach(post => {
        if(post.author === 'sanggo_1973') post.author = '천안상고_official';
    });
    localStorage.setItem('instaFeedDB', JSON.stringify(feedDB));
}

const currentSlideState = {};

function renderRandomFeed() {
    const feedArea = document.getElementById('homeFeedArea');
    if(!feedArea) return; 
    
    const shuffledPosts = feedDB.sort(() => 0.5 - Math.random());
    feedArea.innerHTML = ''; 
    const loggedInUser = localStorage.getItem('loggedInUser');

    for(let i = 0; i < 2; i++) {
        if(!shuffledPosts[i]) continue;
        let post = shuffledPosts[i];
        currentSlideState[post.id] = 0;

        let slidesHTML = '';
        let dotsHTML = '';
        
        post.media.forEach((item, index) => {
            let mediaElement = item.type === 'video' 
                ? `<video src="${item.src}" controls playsinline></video>`
                : `<img src="${item.src}" alt="피드 이미지" onerror="this.outerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;color:#888;\\'>이미지를 찾을 수 없습니다.</div>'">`;
            
            slidesHTML += `<div class="carousel-slide">${mediaElement}</div>`;
            dotsHTML += `<div class="carousel-dot ${index === 0 ? 'active' : ''}" id="dot-${post.id}-${index}"></div>`;
        });

        let prevBtn = post.media.length > 1 ? `<button class="carousel-btn prev" onclick="moveSlide('${post.id}', -1, ${post.media.length})" style="display:none;">❮</button>` : '';
        let nextBtn = post.media.length > 1 ? `<button class="carousel-btn next" onclick="moveSlide('${post.id}', 1, ${post.media.length})">❯</button>` : '';
        let dotsContainer = post.media.length > 1 ? `<div class="carousel-dots">${dotsHTML}</div>` : '';

        let authorName = post.author;
        let isLiked = false;
        if (loggedInUser && post.likedBy && post.likedBy.includes(loggedInUser)) {
            isLiked = true;
        }
        const heartIcon = isLiked ? '❤️' : '🤍'; 
        const likeColor = isLiked ? 'color: #ed4956;' : '';
        const commentCount = post.comments ? post.comments.length : 0;

        feedArea.innerHTML += `
            <div class="post" id="${post.id}">
                <div class="post-header" style="padding-bottom: 5px;">
                    <div class="post-user" style="cursor: pointer; transition: 0.2s; opacity: 1;" onmouseover="this.style.opacity=0.7" onmouseout="this.style.opacity=1" onclick="goToProfile('${authorName}')">
                        <div class="post-avatar"><img src="로고/천상.jpg" class="post-avatar-inner" style="object-fit:cover; border: 2px solid #fff;"></div> 
                        ${authorName}
                    </div>
                </div>
                
                <div class="carousel-container">
                    ${prevBtn}
                    <div class="carousel-track" id="track-${post.id}">
                        ${slidesHTML}
                    </div>
                    ${nextBtn}
                    ${dotsContainer}
                </div>

                <div class="post-actions" style="display: flex; justify-content: flex-start; gap: 10px; font-size: 24px; padding: 10px 0; align-items: center;">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <span style="cursor:pointer; transition: 0.2s; ${likeColor}" onclick="toggleFeedLike('${post.id}', this)">${heartIcon}</span>
                        <span id="feed-like-count-${post.id}" style="font-size: 14px; font-weight: bold;">${post.likes}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <span style="cursor:pointer;" onclick="openFeedComments('${post.id}')">💬</span>
                        <span id="feed-icon-comment-count-${post.id}" style="font-size: 14px; font-weight: bold;">${commentCount}</span>
                    </div>
                </div>

                <div style="font-size: 14px; color: #8e8e8e; cursor: pointer; margin-bottom: 5px;" onclick="openFeedComments('${post.id}')" id="feed-comment-count-${post.id}">
                    댓글 ${commentCount}개 모두 보기
                </div>

                <div style="font-size: 14px; line-height: 1.5; margin-bottom: 10px;">
                    <span style="font-weight: bold; cursor: pointer;" onclick="goToProfile('${authorName}')" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">${authorName}</span> ${post.text}
                </div>
            </div>
        `;
    }
}

function moveSlide(postId, direction, maxSlides) {
    let currentIndex = currentSlideState[postId];
    let newIndex = currentIndex + direction;
    if (newIndex < 0 || newIndex >= maxSlides) return;
    currentSlideState[postId] = newIndex;
    
    const track = document.getElementById(`track-${postId}`);
    track.style.transform = `translateX(-${newIndex * 100}%)`;

    for(let i = 0; i < maxSlides; i++) {
        const dot = document.getElementById(`dot-${postId}-${i}`);
        if(dot) dot.classList.remove('active');
    }
    const activeDot = document.getElementById(`dot-${postId}-${newIndex}`);
    if(activeDot) activeDot.classList.add('active');

    const postElement = document.getElementById(postId);
    const prevBtn = postElement.querySelector('.carousel-btn.prev');
    const nextBtn = postElement.querySelector('.carousel-btn.next');

    if (prevBtn) prevBtn.style.display = newIndex === 0 ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = newIndex === maxSlides - 1 ? 'none' : 'flex';
}

function toggleFeedLike(postId, btn) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) { alert("로그인 후 이용할 수 있습니다."); return; }

    const post = feedDB.find(p => p.id === postId);
    if(!post) return;
    if(!post.likedBy) post.likedBy = [];

    const userIndex = post.likedBy.indexOf(loggedInUser);
    const countSpan = document.getElementById(`feed-like-count-${postId}`);

    if (userIndex > -1) {
        post.likedBy.splice(userIndex, 1);
        post.likes--;
        btn.innerHTML = '🤍';
        btn.style.color = '';
    } else {
        post.likedBy.push(loggedInUser);
        post.likes++;
        btn.innerHTML = '❤️';
        btn.style.color = '#ed4956';
    }

    if (countSpan) countSpan.innerText = post.likes;
    localStorage.setItem('instaFeedDB', JSON.stringify(feedDB));
}

let currentFeedCommentId = null;

function openFeedComments(postId) {
    currentFeedCommentId = postId;
    document.getElementById('feedCommentModal').style.display = 'flex';
    renderFeedComments();
}

function closeFeedComments() {
    document.getElementById('feedCommentModal').style.display = 'none';
    currentFeedCommentId = null;
}

function renderFeedComments() {
    const post = feedDB.find(p => p.id === currentFeedCommentId);
    const listContainer = document.getElementById('feedCommentList');
    listContainer.innerHTML = '';

    if(!post || !post.comments || post.comments.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; color:#888; margin-top:50px; font-size:14px;">아직 댓글이 없습니다.<br>첫 댓글을 남겨보세요!</div>';
        return;
    }

    let userDB = {};
    try { userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {}; } catch(e) {}

    post.comments.forEach(c => {
        let userPic = (userDB[c.userId] && userDB[c.userId].pic) ? `url('${userDB[c.userId].pic}')` : 'none';
        let bgColor = userPic === 'none' ? '#dbdbdb' : 'transparent';

        listContainer.innerHTML += `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background-color: ${bgColor}; background-image: ${userPic}; background-size: cover; background-position: center; flex-shrink: 0; border: 1px solid #dbdbdb; cursor: pointer;" onclick="goToProfile('${c.userId}')"></div>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: bold; font-size: 13px; cursor: pointer;" onclick="goToProfile('${c.userId}')">${c.userId}</span>
                    <span style="font-size: 14px; margin-top: 2px;">${c.text}</span>
                </div>
            </div>
        `;
    });
    listContainer.scrollTop = listContainer.scrollHeight;
}

function submitFeedComment() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) { alert("댓글을 달려면 먼저 로그인해주세요!"); return; }

    const input = document.getElementById('feedCommentInput');
    const text = input.value.trim();
    if(!text) return; 

    const post = feedDB.find(p => p.id === currentFeedCommentId);
    if(post) {
        if(!post.comments) post.comments = [];
        post.comments.push({ userId: loggedInUser, text: text });
        
        localStorage.setItem('instaFeedDB', JSON.stringify(feedDB));
        
        input.value = ''; 
        renderFeedComments(); 
        
        const textCountDivs = document.querySelectorAll(`#feed-comment-count-${post.id}`);
        textCountDivs.forEach(div => div.innerText = `댓글 ${post.comments.length}개 모두 보기`);

        const iconCountSpan = document.getElementById(`feed-icon-comment-count-${post.id}`);
        if(iconCountSpan) iconCountSpan.innerText = post.comments.length;
    }
}

// ==========================================
// 🎬 릴스 무한 스크롤 (18개 랜덤 큐 시스템)
// ==========================================

const initialReelsData = [
    { src: 'assets/reel1.mp4', text: '🚭천안상업고등학교 금연캠페인🚭', likes: 1200 },
    { src: 'assets/reel2.mp4', text: '💁‍♀️💁: 저는 사진찍히기 너무 싫었어요. 카메라랑 안친해요 ㅋㅋ', likes: 850 },
    { src: 'assets/reel3.mp4', text: '🩵천안 상업고등학교 학과 소개🩵', likes: 740 },
    { src: 'assets/reel4.mp4', text: '10억 받기 vs 학예부<br>여러분의 선택은~? 무엇인가요', likes: 920 },
    { src: 'assets/reel5.mp4', text: '귀여운 학생회 총무부 상업부 봉사부 친구들 ••🤍 (춤은 조금더 연습하는걸로!!)', likes: 1100 },
    { src: 'assets/reel6.mp4', text: '🤍여러분의 이상형은 어떤 스타일인가요~?<br>#학생회 와 함께하는#챌린지', likes: 630 },
    { src: 'assets/reel7.mp4', text: '학생회에서 할말있다니까 끝까지 들어라 !!! #천안상업고등학교', likes: 890 },
    { src: 'assets/reel8.mp4', text: '천안상고 등교길에 자전거 삼', likes: 450 },
    { src: 'assets/reel9.mp4', text: '🩵천안상고 홍보단과 🪽함께하는 #산책챌린지', likes: 1320 },
    { src: 'assets/reel10.mp4', text: '천안상업고등학교 엄청 좋은데 이래도 안오실건가요?😳', likes: 870 },
    { src: 'assets/reel11.mp4', text: '#천안상업고등학교', likes: 540 },
    { src: 'assets/reel12.mp4', text: '여기 천안상고 댄스부는 몇명일까요? 🤍', likes: 990 },
    { src: 'assets/reel13.mp4', text: '너를 위해서라면 다 막아줄수있어. 아마도..', likes: 1500 },
    { src: 'assets/reel14.mp4', text: '힙합보단사랑사랑보단돈. 그게 뭔데..?', likes: 780 },
    { src: 'assets/reel15.mp4', text: '천안 상업고등학교에 화사 박정민은 없어도 김규린 임주호가 있다', likes: 810 },
    { src: 'assets/reel16.mp4', text: '천안 상업고등학교에는 멸종위기 새 2마리를 직접 키우고있습니다!!', likes: 620 },
    { src: 'assets/reel17.mp4', text: '선생님 덕분에 학교가 더 반짝이는 중🌷(5/15)', likes: 910 },
    { src: 'assets/reel18.mp4', text: '🏫천안 상업 고등학교 오면 볼 수 있는 누나들🩵', likes: 1040 }
];

let reelsDB = [];
try {
    let parsedReels = JSON.parse(localStorage.getItem('instaReelsDB'));
    if (Array.isArray(parsedReels)) reelsDB = parsedReels;
} catch (e) { console.error("릴스 데이터 로드 오류", e); }

if (reelsDB.length === 0 || reelsDB.length !== initialReelsData.length) {
    reelsDB = initialReelsData.map((reel, index) => ({ ...reel, id: 'reel_' + index, comments: [], likedBy: [] }));
    localStorage.setItem('instaReelsDB', JSON.stringify(reelsDB));
} else {
    reelsDB = reelsDB.map((reel, index) => ({
        ...reel, 
        text: initialReelsData[index].text, 
        src: initialReelsData[index].src 
    }));
    localStorage.setItem('instaReelsDB', JSON.stringify(reelsDB));
}

let reelsQueue = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function refillReelsQueue() {
    const ids = reelsDB.map(r => r.id);
    shuffleArray(ids);
    reelsQueue = ids;
}

function createReelElement(reelData) {
    const wrapper = document.createElement('div');
    wrapper.className = 'reels-video-wrapper';

    const loggedInUser = localStorage.getItem('loggedInUser');
    
    let isLiked = false;
    if (loggedInUser && reelData.likedBy && reelData.likedBy.includes(loggedInUser)) {
        isLiked = true;
    }

    const heartIcon = isLiked ? '❤️' : '🤍';
    const likeClass = isLiked ? 'reels-btn like-btn liked' : 'reels-btn like-btn';

    wrapper.innerHTML = `
        <div class="reels-video-placeholder" onclick="togglePlayPause(this)">
            <video src="${reelData.src}" loop playsinline></video>
            <div class="play-pause-icon">▶</div>
            
            <div class="reels-info">
                <p style="font-weight: bold; margin-bottom: 5px; display:inline-flex; align-items:center; gap:5px; cursor:pointer;" onclick="event.stopPropagation(); goToProfile('천안상고_official')">
                    <img src="로고/천상.jpg" style="width:24px; height:24px; border-radius:50%; object-fit:cover; display:inline-block; border:1px solid #dbdbdb;">
                    @천안상고_official
                </p>
                <p style="font-size: 14px;">${reelData.text}</p>
            </div>
            
            <div class="reels-actions">
                <button class="${likeClass}" onclick="toggleLike(event, this, '${reelData.id}')">
                    <span>${heartIcon}</span>
                    <div style="font-size:12px; font-weight:bold;">${reelData.likes}</div>
                </button>
                <button class="reels-btn reel-comment-btn-${reelData.id}" onclick="event.stopPropagation(); openReelComments('${reelData.id}')">
                    <span>💬</span>
                    <div style="font-size:12px; font-weight:bold;" class="comment-count">${reelData.comments.length}</div>
                </button>
                <button class="reels-btn" onclick="event.stopPropagation(); alert('공유 링크가 복사되었습니다!')">
                    <span>🚀</span>
                </button>
                <button class="reels-btn" onclick="event.stopPropagation()">⋯</button>
            </div>
        </div>
    `;
    return wrapper;
}

function initReels() {
    const container = document.getElementById('reelsContainer');
    if(!container) return;
    container.innerHTML = ''; 
    reelsQueue = [];
    
    for(let i=0; i<3; i++) {
        addRandomReel(container);
    }
}

function addRandomReel(container) {
    if (reelsQueue.length === 0) {
        refillReelsQueue();
    }
    const nextId = reelsQueue.pop(); 
    const randomReel = reelsDB.find(r => r.id === nextId);
    if(randomReel) {
        container.appendChild(createReelElement(randomReel));
    }
}

function handleReelsScroll() {
    const container = document.getElementById('reelsContainer');
    const wrappers = document.querySelectorAll('.reels-video-wrapper');
    
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
        addRandomReel(container);
    }

    wrappers.forEach(wrapper => {
        const video = wrapper.querySelector('video');
        const icon = wrapper.querySelector('.play-pause-icon');
        const rect = wrapper.getBoundingClientRect();
        const isInView = (rect.top >= -rect.height/2 && rect.top <= window.innerHeight/2);
        
        if (isInView) {
            if(video.paused) {
                video.play().catch(e => console.log("자동재생 차단됨:", e));
                icon.classList.remove('show');
            }
        } else {
            if(!video.paused) {
                video.pause();
                video.currentTime = 0; 
            }
        }
    });
}

function togglePlayPause(element) {
    const video = element.querySelector('video');
    const icon = element.querySelector('.play-pause-icon');
    if (video.paused) {
        video.play();
        icon.classList.remove('show');
    } else {
        video.pause();
        icon.classList.add('show'); 
    }
}

function toggleLike(event, btn, reelId) {
    event.stopPropagation(); 
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) {
        alert("로그인 후 이용할 수 있습니다.");
        return;
    }

    const reel = reelsDB.find(r => r.id === reelId);
    if(!reel) return;
    if(!reel.likedBy) reel.likedBy = []; 

    const heartSpan = btn.querySelector('span');
    const countDiv = btn.querySelector('div');
    const userIndex = reel.likedBy.indexOf(loggedInUser);

    if (userIndex > -1) {
        reel.likedBy.splice(userIndex, 1);
        reel.likes--;
        btn.classList.remove('liked');
        heartSpan.innerHTML = '🤍';
    } else {
        reel.likedBy.push(loggedInUser);
        reel.likes++;
        btn.classList.add('liked');
        heartSpan.innerHTML = '❤️';
    }

    countDiv.innerText = reel.likes;
    localStorage.setItem('instaReelsDB', JSON.stringify(reelsDB));
}

let currentCommentReelId = null; 

function openReelComments(reelId) {
    currentCommentReelId = reelId;
    document.getElementById('reelCommentModal').style.display = 'flex';
    renderReelComments();
}

function closeReelComments() {
    document.getElementById('reelCommentModal').style.display = 'none';
    currentCommentReelId = null;
}

function renderReelComments() {
    const reel = reelsDB.find(r => r.id === currentCommentReelId);
    const listContainer = document.getElementById('reelCommentList');
    listContainer.innerHTML = '';

    if(!reel || !reel.comments || reel.comments.length === 0) {
        listContainer.innerHTML = '<div style="text-align:center; color:#888; margin-top:50px; font-size:14px;">아직 댓글이 없습니다.<br>첫 댓글을 남겨보세요!</div>';
        return;
    }

    let userDB = {};
    try { userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {}; } catch(e) {}

    reel.comments.forEach(c => {
        let userPic = (userDB[c.userId] && userDB[c.userId].pic) ? `url('${userDB[c.userId].pic}')` : 'none';
        let bgColor = userPic === 'none' ? '#dbdbdb' : 'transparent';

        listContainer.innerHTML += `
            <div style="display: flex; gap: 10px; align-items: flex-start;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background-color: ${bgColor}; background-image: ${userPic}; background-size: cover; background-position: center; flex-shrink: 0; border: 1px solid #dbdbdb; cursor:pointer;" onclick="closeReelComments(); goToProfile('${c.userId}')"></div>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: bold; font-size: 13px; cursor:pointer;" onclick="closeReelComments(); goToProfile('${c.userId}')">${c.userId}</span>
                    <span style="font-size: 14px; margin-top: 2px;">${c.text}</span>
                </div>
            </div>
        `;
    });
    
    listContainer.scrollTop = listContainer.scrollHeight;
}

function submitReelComment() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) {
        alert("댓글을 달려면 먼저 로그인해주세요!");
        return;
    }

    const input = document.getElementById('reelCommentInput');
    const text = input.value.trim();
    if(!text) return; 

    const reel = reelsDB.find(r => r.id === currentCommentReelId);
    if(reel) {
        if(!reel.comments) reel.comments = [];
        reel.comments.push({ userId: loggedInUser, text: text });
        
        localStorage.setItem('instaReelsDB', JSON.stringify(reelsDB));
        
        input.value = ''; 
        renderReelComments(); 
        
        const countDivs = document.querySelectorAll(`.reel-comment-btn-${reel.id} .comment-count`);
        countDivs.forEach(div => div.innerText = reel.comments.length);
    }
}

// ==========================================
// 🚀 앱 초기화 및 공통 기능
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
    try {
        const savedTheme = localStorage.getItem('theme');
        const mainLogo = document.getElementById('mainLogo');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode-manual');
            if (mainLogo) mainLogo.src = '로고/logo-w.png';
        }
    } catch(e) {}

    try { checkLoginStatus(); } catch(e) { console.error(e); }
    try { if(typeof renderRandomFeed === "function") renderRandomFeed(); } catch(e) { console.error(e); }
    try { if(typeof initReels === "function") initReels(); } catch(e) { console.error(e); }
    try { fetchTimetable(); } catch(e) { console.error(e); }
});

function toggleAuth(type) {
    document.getElementById('loginBox').style.display = type === 'login' ? 'flex' : 'none';
    document.getElementById('signupBox').style.display = type === 'signup' ? 'flex' : 'none';
}

function handleSignup() {
    const id = document.getElementById('signupId').value.trim();
    const name = document.getElementById('signupName').value.trim();
    const pw = document.getElementById('signupPw').value.trim();

    if(!id || !name || !pw) { alert("모든 항목을 입력해주세요."); return; }

    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    if(userDB[id]) { alert("이미 존재하는 아이디입니다."); return; }

    userDB[id] = { password: pw, name: name, bio: "천안상업고등학교 학생", pic: "" };
    localStorage.setItem('instaUserDB', JSON.stringify(userDB));

    alert("회원가입이 완료되었습니다! 로그인해주세요.");
    toggleAuth('login');
}

function handleLogin() {
    const id = document.getElementById('loginId').value.trim();
    const pw = document.getElementById('loginPw').value.trim();

    if(!id || !pw) { alert("아이디와 비밀번호를 입력해주세요."); return; }

    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    const user = userDB[id];

    if(!user || user.password !== pw) {
        alert("아이디 또는 비밀번호가 일치하지 않습니다."); return;
    }

    localStorage.setItem('loggedInUser', id);
    alert(`${user.name}님 환영합니다!`);
    location.reload(); 
}

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const authContainer = document.getElementById('auth-container');
    
    if (loggedInUser) {
        if(authContainer) authContainer.style.display = 'none';
        loadProfile(loggedInUser); 
    } else {
        if(authContainer) authContainer.style.display = 'flex';
    }
}

function openSettings() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) return;

    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    const myInfo = userDB[loggedInUser];

    if(myInfo) {
        document.getElementById('settingsDisplayId').innerText = loggedInUser;
        document.getElementById('settingsDisplayName').innerText = myInfo.name;
        
        const picEl = document.getElementById('settingsPreviewPic');
        picEl.style.backgroundImage = myInfo.pic ? `url(${myInfo.pic})` : 'none';

        document.getElementById('settingsCurrentPw').value = '';
        document.getElementById('settingsNewId').value = loggedInUser;
        document.getElementById('settingsNewPw').value = '';
        document.getElementById('settingsName').value = myInfo.name;
        document.getElementById('settingsBio').value = myInfo.bio.replace(/<br>/g, '\n');
    }
    
    switchTab('settings');
}

function previewSettingsPic(input) {
    if(input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('settingsPreviewPic').style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function saveProfileSettings() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) return;
    
    let userDB = JSON.parse(localStorage.getItem('instaUserDB'));
    const myInfo = userDB[loggedInUser];

    const currentPwInput = document.getElementById('settingsCurrentPw').value;
    const newIdInput = document.getElementById('settingsNewId').value.trim();
    const newPwInput = document.getElementById('settingsNewPw').value.trim();
    const newNameInput = document.getElementById('settingsName').value.trim();
    const newBioInput = document.getElementById('settingsBio').value.replace(/\n/g, '<br>');

    if (newIdInput !== loggedInUser || newPwInput !== "") {
        if (currentPwInput !== myInfo.password) {
            alert("보안을 위해 현재 비밀번호를 정확히 입력해야 아이디나 비밀번호를 변경할 수 있습니다.");
            return;
        }
    }

    let targetId = loggedInUser;

    if (newIdInput !== loggedInUser && newIdInput !== "") {
        if (userDB[newIdInput]) {
            alert("이미 누군가 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.");
            return;
        }
        userDB[newIdInput] = userDB[loggedInUser];
        delete userDB[loggedInUser];
        
        targetId = newIdInput;
        localStorage.setItem('loggedInUser', targetId); 
    }

    if (newPwInput !== "") {
        userDB[targetId].password = newPwInput;
    }

    userDB[targetId].name = newNameInput;
    userDB[targetId].bio = newBioInput;

    const file = document.getElementById('settingsPicUpload').files[0];
    if(file) {
        const reader = new FileReader();
        reader.onload = (e) => { 
            userDB[targetId].pic = e.target.result;
            localStorage.setItem('instaUserDB', JSON.stringify(userDB));
            alert("프로필이 성공적으로 업데이트되었습니다!");
            location.reload(); 
        };
        reader.readAsDataURL(file);
    } else {
        localStorage.setItem('instaUserDB', JSON.stringify(userDB));
        alert("프로필이 성공적으로 업데이트되었습니다!");
        location.reload();
    }
}

function openProfileSettings() { document.getElementById('profileSettingsModal').style.display = 'flex'; }
function closeProfileSettings() { document.getElementById('profileSettingsModal').style.display = 'none'; }
function openMoreMenu() { document.getElementById('moreMenuModal').style.display = 'flex'; }
function closeMoreMenu() { document.getElementById('moreMenuModal').style.display = 'none'; }

function handleLogout() {
    if(confirm("정말 로그아웃 하시겠습니까?")) {
        localStorage.removeItem('loggedInUser');
        location.reload(); 
    }
}

function handleAccountSwitch() {
    closeMoreMenu();
    const newId = prompt("전환할 계정의 아이디를 입력하세요.");
    if(newId) {
        const newPw = prompt("비밀번호를 입력하세요.");
        if(newPw) {
            let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
            const user = userDB[newId];
            if(user && user.password === newPw) {
                localStorage.setItem('loggedInUser', newId);
                alert(`'${newId}' 계정으로 전환되었습니다!`);
                location.reload();
            } else {
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        }
    }
}

function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode-manual');
    
    const mainLogo = document.getElementById('mainLogo');
    if (body.classList.contains('dark-mode-manual')) {
        mainLogo.src = '로고/logo-w.png'; 
        localStorage.setItem('theme', 'dark'); 
    } else {
        mainLogo.src = '로고/logo-b.png'; 
        localStorage.setItem('theme', 'light'); 
    }
    
    closeMoreMenu();
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsContainer = document.getElementById('searchResults');
    
    if(!query) { resultsContainer.style.display = 'none'; return; }

    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    let matchedUsers = [];
    
    for(let id in userDB) {
        let name = userDB[id].name.toLowerCase();
        let lowerId = id.toLowerCase();
        if(lowerId.includes(query) || name.includes(query)) {
            matchedUsers.push({ id: id, ...userDB[id] });
        }
    }

    resultsContainer.innerHTML = '';
    if(matchedUsers.length === 0) {
        resultsContainer.innerHTML = '<div style="color:#888; text-align:center; padding: 10px;">검색 결과가 없습니다.</div>';
    } else {
        matchedUsers.forEach(user => {
            const picStyle = user.pic ? `background-image: url('${user.pic}'); background-size:cover;` : 'background: #dbdbdb;';
            resultsContainer.innerHTML += `
                <div class="search-result-item" onclick="goToProfile('${user.id}')">
                    <div style="width: 44px; height: 44px; border-radius: 50%; ${picStyle}"></div>
                    <div style="display: flex; flex-direction: column;">
                        <span style="font-weight: bold; font-size: 14px;">${user.id}</span>
                        <span style="color: #8e8e8e; font-size: 14px;">${user.name}</span>
                    </div>
                </div>
            `;
        });
    }
    resultsContainer.style.display = 'flex';
}

function goToProfile(targetId) {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    if(searchInput) searchInput.value = '';
    if(searchResults) searchResults.style.display = 'none';
    
    const success = loadProfile(targetId); 
    
    if (success) {
        switchTab('profile'); 
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        const navItems = Array.from(document.querySelectorAll('.nav-item'));
        const profileNav = navItems.find(el => el.getAttribute('onclick') && el.getAttribute('onclick').includes("'profile'"));
        if (profileNav) profileNav.classList.add('active');
    } else {
        alert("프로필 정보를 찾을 수 없습니다.");
    }
}

function loadProfile(userId) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    const targetInfo = userDB[userId];
    
    if(!targetInfo) return false; 

    document.getElementById('displayUsername').innerText = userId;
    document.getElementById('displayName').innerText = targetInfo.name;
    document.getElementById('displayBio').innerHTML = targetInfo.bio;
    
    if(targetInfo.pic) {
        document.getElementById('displayPic').style.backgroundImage = `url(${targetInfo.pic})`;
    } else {
        document.getElementById('displayPic').style.backgroundImage = 'none';
        document.getElementById('displayPic').style.backgroundColor = '#dbdbdb';
    }

    const followersCount = targetInfo.followers ? targetInfo.followers.length : 0;
    const followingCount = targetInfo.following ? targetInfo.following.length : 0;
    document.getElementById('statFollowers').innerText = followersCount;
    document.getElementById('statFollowing').innerText = followingCount;

    const btnFollow = document.getElementById('btnFollow');
    const btnMessage = document.getElementById('btnMessage');
    const btnEditProfile = document.getElementById('btnEditProfile');
    const btnProfileSettings = document.getElementById('btnProfileSettings');

    if(userId === loggedInUser) {
        btnFollow.style.display = 'none';
        btnMessage.style.display = 'none';
        btnEditProfile.style.display = 'inline-block';
        if(btnProfileSettings) btnProfileSettings.style.display = 'inline-block';
    } else {
        btnFollow.style.display = 'inline-block';
        btnMessage.style.display = 'inline-block';
        btnEditProfile.style.display = 'none';
        if(btnProfileSettings) btnProfileSettings.style.display = 'none';

        let myInfo = userDB[loggedInUser];
        myInfo.following = myInfo.following || [];
        
        if(myInfo.following.includes(userId)) {
            btnFollow.innerText = '팔로잉';
            btnFollow.classList.remove('blue');
        } else {
            btnFollow.innerText = '팔로우';
            btnFollow.classList.add('blue');
        }
    }
    
    return true; 
}

function toggleFollow() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const targetId = document.getElementById('displayUsername').innerText;
    
    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    
    userDB[loggedInUser].following = userDB[loggedInUser].following || [];
    userDB[targetId].followers = userDB[targetId].followers || [];

    const isFollowing = userDB[loggedInUser].following.includes(targetId);

    if(isFollowing) {
        userDB[loggedInUser].following = userDB[loggedInUser].following.filter(id => id !== targetId);
        userDB[targetId].followers = userDB[targetId].followers.filter(id => id !== loggedInUser);
    } else {
        userDB[loggedInUser].following.push(targetId);
        userDB[targetId].followers.push(loggedInUser);
    }

    localStorage.setItem('instaUserDB', JSON.stringify(userDB)); 
    loadProfile(targetId); 
}

function openFollowList(type) {
    const currentProfileId = document.getElementById('displayUsername').innerText;
    const userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    const targetUser = userDB[currentProfileId];
    if(!targetUser) return;

    document.getElementById('followListTitle').innerText = type === 'followers' ? '팔로워' : '팔로잉';
    
    const container = document.getElementById('followListContainer');
    container.innerHTML = ''; 

    const list = type === 'followers' ? (targetUser.followers || []) : (targetUser.following || []);

    if(list.length === 0) {
        container.innerHTML = '<div style="text-align:center; color:#888; margin-top: 50px;">목록이 비어 있습니다.</div>';
    } else {
        list.forEach(userId => {
            const info = userDB[userId];
            if(!info) return; 

            const myInfo = userDB[loggedInUser] || { following: [] };
            const isFollowing = (myInfo.following || []).includes(userId);
            const isMe = userId === loggedInUser;

            let btnHtml = '';
            if(!isMe) {
                if(isFollowing) {
                    btnHtml = `<button class="follow-list-btn" onclick="toggleFollowFromList('${userId}', this)">팔로잉</button>`;
                } else {
                    btnHtml = `<button class="follow-list-btn blue" onclick="toggleFollowFromList('${userId}', this)">팔로우</button>`;
                }
            }

            const picStyle = info.pic ? `background-image: url('${info.pic}');` : '';

            container.innerHTML += `
                <div class="follow-list-item">
                    <div class="follow-list-user" onclick="closeFollowList(); goToProfile('${userId}');">
                        <div class="follow-list-avatar" style="${picStyle}"></div>
                        <div class="follow-list-info">
                            <span class="follow-list-id">${userId}</span>
                            <span class="follow-list-name">${info.name}</span>
                        </div>
                    </div>
                    ${btnHtml}
                </div>
            `;
        });
    }

    document.getElementById('followListModal').style.display = 'flex';
}

function closeFollowList() {
    document.getElementById('followListModal').style.display = 'none';
}

function toggleFollowFromList(targetId, btnElement) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if(!loggedInUser) return;

    let userDB = JSON.parse(localStorage.getItem('instaUserDB')) || {};
    userDB[loggedInUser].following = userDB[loggedInUser].following || [];
    userDB[targetId].followers = userDB[targetId].followers || [];

    const isFollowing = userDB[loggedInUser].following.includes(targetId);

    if(isFollowing) {
        userDB[loggedInUser].following = userDB[loggedInUser].following.filter(id => id !== targetId);
        userDB[targetId].followers = userDB[targetId].followers.filter(id => id !== loggedInUser);
        btnElement.innerText = '팔로우';
        btnElement.classList.add('blue');
    } else {
        userDB[loggedInUser].following.push(targetId);
        userDB[targetId].followers.push(loggedInUser);
        btnElement.innerText = '팔로잉';
        btnElement.classList.remove('blue');
    }

    localStorage.setItem('instaUserDB', JSON.stringify(userDB)); 
    const currentProfileId = document.getElementById('displayUsername').innerText;
    loadProfile(currentProfileId); 
}

// ==========================================
// 📅 시간표 데이터 API 연동
// ==========================================
const NEIS_API_KEY = "cfb112990979408f9256db5c7db6f511"; 
const OFFICE_CODE = "N10"; 
const SCHOOL_CODE = "8140358"; 

function updateTimetable() {
    const grade = document.getElementById('gradeSelect').value;
    const classNm = document.getElementById('classInput').value;
    
    if(!classNm || classNm < 1) {
        alert("정확한 반을 입력해주세요.");
        return;
    }
    
    fetchTimetable(grade, classNm);
}

async function fetchTimetable(grade = "1", classNm = "1") {
    const titleEl = document.getElementById('timetableTitle');
    if(titleEl) titleEl.innerText = `🗓️ 학급 시간표 (${grade}학년 ${classNm}반)`;

    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); 
    
    const monday = new Date(today.setDate(diffToMonday));
    const dates = []; 
    
    for(let i=0; i<5; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0'); 
        const dd = String(d.getDate()).padStart(2, '0');
        dates.push(`${yyyy}${mm}${dd}`);
    }
    
    const startDate = dates[0]; 
    const endDate = dates[4];   

    const url = `https://open.neis.go.kr/hub/hisTimetable?KEY=${NEIS_API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${OFFICE_CODE}&SD_SCHUL_CODE=${SCHOOL_CODE}&AY=2026&SEM=1&GRADE=${grade}&CLASS_NM=${classNm}&TI_FROM_YMD=${startDate}&TI_TO_YMD=${endDate}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const tbody = document.querySelector('.timetable-table tbody');
        
        if (data.hisTimetable) {
            const rawData = data.hisTimetable[1].row;
            renderTimetable(rawData, dates, tbody); 
        } else {
            if(tbody) tbody.innerHTML = `<tr><td colspan="6" style="padding: 40px; color: #888; text-align: center;">해당 학급의 시간표 데이터가 없습니다.</td></tr>`;
        }
    } catch (error) {
        console.error("API 연동 중 오류 발생:", error);
        const tbody = document.querySelector('.timetable-table tbody');
        if(tbody) tbody.innerHTML = `<tr><td colspan="6" style="padding: 40px; color: #888; text-align: center;">데이터를 불러올 수 없습니다. 네트워크를 확인해주세요.</td></tr>`;
    }
}

function renderTimetable(rows, dates, tbody) {
    if(!tbody) return;
    tbody.innerHTML = ''; 
    
    let maxPeriod = 0;
    rows.forEach(row => {
        if(Number(row.PERIO) > maxPeriod) maxPeriod = Number(row.PERIO);
    });

    let timetable = Array.from({length: maxPeriod}, () => Array(5).fill("-"));

    rows.forEach(row => {
        const periodIdx = Number(row.PERIO) - 1; 
        const dayIdx = dates.indexOf(row.ALL_TI_YMD); 
        
        if(dayIdx !== -1) {
            timetable[periodIdx][dayIdx] = row.ITRT_CNTNT; 
        }
    });

    timetable.forEach((row, index) => {
        let tr = `<tr><td style="font-weight:bold; background:#f9f9f9;">${index + 1}</td>`;
        row.forEach(subject => {
            tr += `<td>${subject}</td>`;
        });
        tr += `</tr>`;
        tbody.innerHTML += tr;
    });
}