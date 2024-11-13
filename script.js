document.addEventListener("DOMContentLoaded", loadMemos);

function saveMemo() {
    const memoInput = document.getElementById("memoInput").value.trim();
    if (memoInput) {
        const memos = getMemos();
        memos.push(memoInput);
        localStorage.setItem("memos", JSON.stringify(memos));
        document.getElementById("memoInput").value = "";
        renderMemos();
    }
}

function getMemos() {
    return JSON.parse(localStorage.getItem("memos") || "[]");
}

function renderMemos() {
    const memoList = document.getElementById("memoList");
    memoList.innerHTML = "";
    const memos = getMemos();
    memos.forEach((memo, index) => {
        const memoDiv = document.createElement("div");
        memoDiv.className = "memoItem";
        memoDiv.textContent = memo;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "deleteBtn";
        deleteBtn.onclick = () => deleteMemo(index);

        memoDiv.appendChild(deleteBtn);
        memoList.appendChild(memoDiv);
    });
}

function loadMemos() {
    renderMemos();
}

function deleteMemo(index) {
    const memos = getMemos();
    memos.splice(index, 1);
    localStorage.setItem("memos", JSON.stringify(memos));
    renderMemos();
}

