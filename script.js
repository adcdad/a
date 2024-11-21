// DOM 요소 가져오기
const memoInput = document.getElementById('memo-input');
const saveBtn = document.getElementById('save-btn');
const memoList = document.getElementById('memo-list');

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
saveBtn.addEventListener('click', saveMemo);

// 페이지 로드 시 메모 표시
window.onload = displayMemos;

