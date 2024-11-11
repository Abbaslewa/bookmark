let editIndex = -1;
const websiteNameInput = document.getElementById('websiteName');
const websiteURLInput = document.getElementById('websiteURL');
const addBookmarkBtn = document.getElementById('addBookmark');
const bookmarkList = document.getElementById('bookmarkList');

addBookmarkBtn.addEventListener('click', handleBookmark);
document.addEventListener('DOMContentLoaded', loadBookmarks);

function handleBookmark() {
    const name = websiteNameInput.value;
    const url = websiteURLInput.value;

    if (!name || !url) {
        alert('Please enter both name and URL');
        return;
    }

    let bookmarks = getBookmarks();

    if (editIndex === -1) {
        
        bookmarks.push({ name, url });
    } else {
       
        bookmarks[editIndex] = { name, url };
        editIndex = -1;
        addBookmarkBtn.textContent = 'Add Bookmark';
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    websiteNameInput.value = '';
    websiteURLInput.value = '';

    loadBookmarks();
}

function loadBookmarks() {
    const bookmarks = getBookmarks();
    bookmarkList.innerHTML = '';

    bookmarks.forEach((bookmark, index) => {
        const card = document.createElement('div');
        card.classList.add('bookmark-card');
        card.innerHTML = `
            <h3>${bookmark.name}</h3>
            <a href="${bookmark.url}" target="_blank"><i class="fa fa-external-link" aria-hidden="true"></i> ${bookmark.url}</a>
            <div class="card-actions">
                <button class="edit-btn" onclick="editBookmark(${index})">
                    <i class="fa-solid fa-pen-to-square"></i>Edit
                </button>
                <button class="delete-btn" onclick="deleteBookmark(${index})">
                    <i class="fa-solid fa-trash-can"></i>Delete
                </button>
            </div>
        `;
        bookmarkList.appendChild(card);
    });
}

function getBookmarks() {
    return JSON.parse(localStorage.getItem('bookmarks')) || [];
}

function editBookmark(index) {
    const bookmarks = getBookmarks();
    const bookmark = bookmarks[index];

    websiteNameInput.value = bookmark.name;
    websiteURLInput.value = bookmark.url;

    editIndex = index; 
    addBookmarkBtn.textContent = 'Update Bookmark';
}

function deleteBookmark(index) {
    let bookmarks = getBookmarks();
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    loadBookmarks();
}
