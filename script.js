// Fungsi untuk menyimpan posting ke localStorage
function savePost() {
    const title = document.getElementById('post-title').value.trim();
    const content = document.getElementById('post-content').value.trim();

    if (!title || !content) {
        alert('Judul dan konten posting harus diisi!');
        return;
    }

    const post = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
    };

    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.unshift(post); // Tambah ke depan agar posting terbaru di atas
    localStorage.setItem('posts', JSON.stringify(posts));

    document.getElementById('post-title').value = '';
    document.getElementById('post-content').value = '';
    loadPosts();
}

// Fungsi untuk memuat posting dari localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';

    if (posts.length === 0) {
        postsList.innerHTML =
            '<p class="text-gray-500 text-center">Belum ada posting. Mulai bagikan cerita Anda!</p>';
        return;
    }

    posts.forEach((post) => {
        const postDiv = document.createElement('article');
        postDiv.className =
            'p-6 rounded-lg shadow-md mb-6 transition-transform duration-300 ease-in-out';
        postDiv.innerHTML = `
            <h2 class="text-2xl font-bold text-gray-800 mb-2">${post.title}</h2>
            <p class="text-teal-600 font-semibold text-sm mb-4">${post.date}</p>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">${post.content}</p>
            <button onclick="deletePost(${post.id})" class="mt-6 px-5 py-2 rounded-lg text-white font-semibold hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1">Hapus Posting</button>
        `;
        postsList.appendChild(postDiv);
    });
}

// Fungsi untuk menghapus posting
function deletePost(id) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts = posts.filter((post) => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

// Load posting saat halaman dimuat
window.onload = loadPosts;
