// DOM 요소 가져오기
const setupContainer = document.getElementById('setup-container');
const loginContainer = document.getElementById('login-container');
const memoContainer = document.getElementById('memo-container');

const setupBtn = document.getElementById('setup-btn');
const newUsernameInput = document.getElementById('new-username');
const newPasswordInput = document.getElementById('new-password');
const setupError = document.getElementById('setup-error');

const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');

const logoutBtn = document.getElementById('logout-btn');
const memoInput = document.getElementById('memo-input');
const saveBtn = document.getElementById('save-btn');
const memoList = document.getElementById('memo-list');

// 관리자 계정 생성 기능
function setupAdminAccount() {
    const newUsername = newUsernameInput.value.trim();
    const newPassword = newPasswordInput.value.trim();

    if (!newUsername || !newPassword) {
        setupError.textContent = '아이디와 비밀번호를 모두 입력하세요.';
        return;
    }

    // 로컬 스토리지에 계정 저장
    localStorage.setItem('admin', JSON.stringify({ username: newUsername, password: newPassword }));
    setupContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
}

// 로그인 기능
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (!admin) {
        loginError.textContent = '관리자 계정이 설정되지 않았습니다.';
        return;
    }

    if (username === admin.username && password === admin.password) {
        loginContainer.classList.add('hidden');
        memoContainer.classList.remove('hidden');
        loginError.textContent = '';
        displayMemos();
    } else {
        loginError.textContent = '아이디 또는 비밀번호가 잘못되었습니다.';
    }
}

// 로그아웃 기능
function handleLogout() {
    memoContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    usernameInput.value = '';
    passwordInput.value = '';
    memoInput.value = '';
}

// 메모를 저장하는 함수
function saveMemo() {
    const content = memoInput.value.trim();
    if (!content) {
        alert("메모를 입력하세요!");
        return;
    }

    const date = new Date().toLocaleString();
    const memo = { content, date };

    // 기존 메모를 가져옴
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.push(memo);

    // 로컬 스토리지에 저장
    localStorage.setItem('memos', JSON.stringify(memos));

    // 화면에 메모 표시
    displayMemos();

    // 입력 필드 초기화
    memoInput.value = '';
}

// 저장된 메모를 화면에 표시하는 함수
function displayMemos() {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memoList.innerHTML = '';

    memos.forEach((memo, index) => {
        const memoDiv = document.createElement('div');
        memoDiv.className = 'memo';

        const memoDate = document.createElement('div');
        memoDate.className = 'memo-date';
        memoDate.textContent = memo.date;

        const memoContent = document.createElement('div');
        memoContent.className = 'memo-content';
        memoContent.textContent = memo.content;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '삭제';
        deleteBtn.onclick = () => deleteMemo(index);

        memoDiv.appendChild(memoDate);
        memoDiv.appendChild(memoContent);
        memoDiv.appendChild(deleteBtn);

        memoList.appendChild(memoDiv);
    });
}

// 메모를 삭제하는 함수
function deleteMemo(index) {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    memos.splice(index, 1);

    // 로컬 스토리지에 다시 저장
    localStorage.setItem('memos', JSON.stringify(memos));

    // 화면 업데이트
    displayMemos();
}

// 이벤트 리스너 등록
setupBtn.addEventListener('click', setupAdminAccount);
loginBtn.addEventListener('click', handleLogin);
logoutBtn.addEventListener('click', handleLogout);
saveBtn.addEventListener('click', saveMemo);

// 페이지 로드 시 계정 상태 확인
window.onload = () => {
    const admin = JSON.parse(localStorage.getItem('admin'));

    if (!admin) {
        setupContainer.classList.remove('hidden');
    } else {
        loginContainer.classList.remove('hidden');
    }
};

