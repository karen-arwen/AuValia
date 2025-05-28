// This file contains the JavaScript functionality for the modal. It includes event listeners to open and close the modal, as well as any additional interactivity required for the modal to function properly.

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-customer-comments');
    const closeBtn = document.getElementById('close-modal-btn');
    const seeMoreBtn = document.getElementById('see-more-comments-btn');
    const commentsList = document.getElementById('comments-list');

    // Comentários mockados (agora iguais aos da seção Avaliações, com tipo de serviço)
    const comments = [
        {
            id: 1,
            avatar: "imagens/Marco.jpg",
            name: "Marco Chuveiros",
            service: "Banho & Tosa",
            date: "12/04/2025",
            rating: 5,
            text: "Atendimento excelente! Meu cachorro adorou o banho e a tosa ficou perfeita.",
            media: []
        },
        {
            id: 2,
            avatar: "imagens/Sabrina.jpg",
            name: "Sabrina Carpinteira",
            service: "Consulta Veterinária",
            date: "28/03/2025",
            rating: 4,
            text: "Veterinários muito atenciosos. Minha gata foi muito bem cuidada durante a consulta.",
            media: [
                "imagens/Gata da Sabrina.jpg"
            ]
        },
        {
            id: 3,
            avatar: "imagens/Chico.webp",
            name: "Chico Moedas",
            service: "Adestramento",
            date: "05/04/2025",
            rating: 4,
            text: "Preço justo e serviço de qualidade. O adestramento já está mostrando resultados!",
            media: []
        },
        // Novo comentário: Karen
        {
            id: 4,
            avatar: "imagens/Karen Karate Judo Sumo Samurai",
            name: "Karen Karate Judo Sumo Samurai",
            service: "Banho & Tosa",
            date: "19/05/2025",
            rating: 4,
            text: "Minha cachorra ficou linda após o banho e tosa! Atendimento carinhoso e ambiente limpo. Recomendo muito!",
            media: [
                "imagens/Azul1.jpeg"
            ]
        },
        // Novo comentário: Bia
        {
            id: 5,
            avatar: "imagens/Bia Nissan Honda Mitsubishi Subaru",
            name: "Bia Nissan Honda Mitsubishi Subaru",
            service: "Consulta Veterinária",
            date: "18/05/2025",
            rating: 4,
            text: "Levei minha cachorra para consulta e adorei o cuidado da equipe. Ela foi tratada com muito carinho!",
            media: [
                "imagens/Azul2.jpeg"
            ]
        }
    ];

    // Preencher dinamicamente o select de serviços
    function fillServiceTypes() {
        const serviceTypeSelect = document.getElementById('serviceType');
        // Opções fixas, iguais à seção principal
        const services = [
            "Banho",
            "Tosa",
            "Vacinação",
            "Consultas",
            "Adestramento"
        ];
        serviceTypeSelect.innerHTML = '<option value="">Todos os serviços</option>' +
            services.map(s => `<option value="${s}">${s}</option>`).join('');
    }

    function renderComments(list) {
        commentsList.innerHTML = '';
        if (list.length === 0) {
            commentsList.innerHTML = '<div class="text-center text-gray-400 py-10">Nenhum comentário encontrado.</div>';
            return;
        }
        list.forEach(comment => {
            const stars = Array.from({length: 5}, (_, i) =>
                `<i class="fa-${i < comment.rating ? 'solid' : 'regular'} fa-star ${i < comment.rating ? 'text-[#f7943e]' : 'text-gray-300'}"></i>`
            ).join('');
            // Suporte a imagens e vídeos
            const mediaImgs = (comment.media || []).map(url => {
                const ext = url.split('.').pop().toLowerCase();
                if (['mp4','webm','ogg'].includes(ext)) {
                    return `<video src="${url}" class="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer comment-media transition-transform duration-200 hover:scale-105" data-media-url="${url}" data-media-type="video" style="background:#000"></video>`;
                } else {
                    return `<img src="${url}" alt="Pet" class="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow-sm cursor-pointer comment-media transition-transform duration-200 hover:scale-105" data-media-url="${url}" data-media-type="image" />`;
                }
            }).join('');
            commentsList.innerHTML += `
                <div class="comment-card bg-white rounded-xl shadow-md px-6 py-5 flex flex-col gap-y-3 border border-gray-100 transition-shadow duration-200 hover:shadow-xl">
                    <div class="flex items-center gap-x-4">
                        <img src="${comment.avatar}" alt="Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-[#f9fafb]" />
                        <div>
                            <span class="font-semibold text-gray-700 text-lg block">${comment.name}</span>
                            <span class="text-sm text-gray-400">${comment.service ? comment.service + ' • ' : ''}${comment.date}</span>
                        </div>
                        <div class="ml-auto flex items-center gap-x-1 comment-rating">
                            ${stars}
                        </div>
                    </div>
                    <p class="text-gray-700 text-base leading-relaxed">${comment.text}</p>
                    ${mediaImgs ? `<div class="flex gap-x-3 pt-2">${mediaImgs}</div>` : ''}
                    <button class="util-btn group mt-2 w-full flex items-center justify-center gap-2 px-0 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-gray-700 font-medium text-base transition-all duration-150 hover:bg-[#fff7ed] hover:border-[#f7943e] hover:text-[#f7943e] focus:outline-none focus:ring-2 focus:ring-[#f7943e]"
                        style="min-height:40px; min-width:120px;">
                        <i class="fa-regular fa-thumbs-up group-hover:text-[#f7943e] transition-colors duration-150"></i>
                        <span class="ml-1">Útil</span>
                        <span class="useful-count ml-1 text-[#f7943e] font-semibold">0</span>
                    </button>
                </div>
            `;
        });

        // Adiciona evento para todas as mídias clicáveis
        commentsList.querySelectorAll('.comment-media').forEach(el => {
            el.addEventListener('click', function(e) {
                const url = this.getAttribute('data-media-url');
                const type = this.getAttribute('data-media-type');
                openMediaViewer(url, type);
            });
        });
    }

    // Função para abrir o modal
    function openModal() {
        // Salva o scroll atual
        const scrollY = window.scrollY || window.pageYOffset;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
        // Compensa a largura da scrollbar
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollBarWidth > 0 ? scrollBarWidth + 'px' : '';
        modal.style.opacity = '0';
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'active');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        fillServiceTypes();
        // Limpa seleção das patinhas ao abrir o modal
        document.querySelectorAll('#filter-rating .paw-icon').forEach(btn => btn.classList.remove('selected', 'paw-colored'));
        renderComments(comments); // garante que os comentários aparecem ao abrir
        setTimeout(() => {
            modal.style.transition = 'opacity 0.2s';
            modal.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            const firstInput = modal.querySelector('#comments-filter-form input, #comments-filter-form select, #comments-filter-form textarea');
            if (firstInput) firstInput.focus();
        }, 300);
    }

    // Função para fechar o modal
    function closeModal() {
        // Restaura o scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        if (scrollY) window.scrollTo(0, -parseInt(scrollY || '0'));
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.remove('flex', 'active');
            modal.classList.add('hidden');
        }, 200);
    }

    // Botão 'Ver mais comentários' para abrir o modal
    seeMoreBtn.addEventListener('click', openModal);

    // Botão fechar
    closeBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora do conteúdo
    modal.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });

    // Fechar com tecla ESC, mas shake se campo obrigatório vazio
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const requiredInput = modal.querySelector('input[required]');
            if (requiredInput && !requiredInput.value) {
                modal.classList.add('shake');
                setTimeout(() => modal.classList.remove('shake'), 400);
            } else {
                closeModal();
            }
        }
    });

    // Função utilitária para obter rating selecionado
    function getSelectedRating() {
        const ratingBtns = document.querySelectorAll('#filter-rating .paw-icon');
        let selected = 0;
        ratingBtns.forEach((btn, idx) => {
            if (btn.classList.contains('selected')) selected = idx + 1;
        });
        return selected;
    }

    // Função para filtrar comentários
    function applyFilters() {
        const keyword = document.getElementById('keyword').value.trim().toLowerCase();
        const dateRange = document.getElementById('dateRange').value;
        const serviceType = document.getElementById('serviceType').value;
        const selectedRating = getSelectedRating();
        const mediaAttached = document.getElementById('mediaAttached').checked;

        let filtered = comments.filter(comment => {
            // Palavra-chave
            if (keyword && !(
                (comment.name && comment.name.toLowerCase().includes(keyword)) ||
                (comment.text && comment.text.toLowerCase().includes(keyword)) ||
                (comment.service && comment.service.toLowerCase().includes(keyword))
            )) return false;

            // Data (intervalo)
            if (dateRange) {
                const commentDate = new Date(comment.date.split('/').reverse().join('-'));
                const now = new Date();
                const days = parseInt(dateRange, 10);
                const diff = (now - commentDate) / (1000 * 60 * 60 * 24);
                if (diff > days) return false;
            }

            // Serviço
            if (serviceType && comment.service) {
                if (!comment.service.toLowerCase().includes(serviceType.toLowerCase())) return false;
            }

            // Avaliação
            if (selectedRating && comment.rating !== selectedRating) return false;

            // Mídia
            if (mediaAttached && (!comment.media || comment.media.length === 0)) return false;

            return true;
        });

        renderComments(filtered);
    }

    // Função para limpar filtros
    function clearFilters() {
        document.getElementById('keyword').value = '';
        document.getElementById('dateRange').value = '';
        document.getElementById('serviceType').value = '';
        document.getElementById('mediaAttached').checked = false;
        document.querySelectorAll('#filter-rating .paw-icon').forEach(btn => btn.classList.remove('selected', 'paw-colored'));
        renderComments(comments);
    }

    // Seleciona as patinhas dentro do filtro usando delegation para nunca perder o evento
    const filterRating = document.getElementById('filter-rating');
    if (filterRating) {
        filterRating.addEventListener('click', function(e) {
            const pawIcons = filterRating.querySelectorAll('.paw-icon');
            const paw = e.target.closest('.paw-icon');
            if (!paw) return;
            const idx = Array.from(pawIcons).indexOf(paw);
            const alreadySelected = paw.classList.contains('selected') && (idx + 1 === getSelectedRating());
            pawIcons.forEach((p, i) => {
                if (alreadySelected) {
                    p.classList.remove('selected', 'paw-colored');
                } else {
                    if (i <= idx) {
                        p.classList.add('selected', 'paw-colored');
                    } else {
                        p.classList.remove('selected', 'paw-colored');
                    }
                }
            });
            applyFilters();
        });
    }

    // Garante que ao limpar filtros as patinhas também percam a cor
    function clearFilters() {
        document.getElementById('keyword').value = '';
        document.getElementById('dateRange').value = '';
        document.getElementById('serviceType').value = '';
        document.getElementById('mediaAttached').checked = false;
        document.querySelectorAll('#filter-rating .paw-icon').forEach(btn => btn.classList.remove('selected', 'paw-colored'));
        renderComments(comments);
    }

    // Eventos dos filtros
    document.getElementById('comments-filter-form').addEventListener('input', function(e) {
        if (!e.target.closest('#filter-rating')) applyFilters();
    });
    document.getElementById('mediaAttached').addEventListener('change', applyFilters);
    document.getElementById('dateRange').addEventListener('change', applyFilters);
    document.getElementById('serviceType').addEventListener('change', applyFilters);
    document.getElementById('keyword').addEventListener('input', applyFilters);

    // Botões aplicar/limpar
    document.querySelector('button[type="submit"]').addEventListener('click', function(e) {
        e.preventDefault();
        applyFilters();
    });
    document.querySelector('button[type="button"].bg-gray-50').addEventListener('click', function(e) {
        e.preventDefault();
        clearFilters();
    });

    // Exponha openModal globalmente para testes
    window.openCustomerCommentsModal = openModal;

    // Adiciona modal de visualização de mídia se não existir
    if (!document.getElementById('media-viewer-modal')) {
        const modalDiv = document.createElement('div');
        modalDiv.id = 'media-viewer-modal';
        modalDiv.style.display = 'none';
        modalDiv.style.position = 'fixed';
        modalDiv.style.inset = '0';
        modalDiv.style.zIndex = '9999';
        modalDiv.style.background = 'rgba(0,0,0,0.85)';
        modalDiv.style.alignItems = 'center';
        modalDiv.style.justifyContent = 'center';
        modalDiv.style.transition = 'opacity 0.2s';
        modalDiv.innerHTML = `
            <div id="media-viewer-content" style="max-width:90vw;max-height:90vh;position:relative;display:flex;align-items:center;justify-content:center;">
                <button id="media-viewer-close" style="
                    position:absolute;
                    top:1.25rem;
                    right:1.25rem;
                    width:2.5rem;
                    height:2.5rem;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:1.7rem;
                    color:#fff;
                    background:rgba(0,0,0,0.35);
                    border:none;
                    border-radius:50%;
                    cursor:pointer;
                    z-index:2;
                    box-shadow:0 2px 8px #0003;
                    padding:0;
                    ">
                    <i class="fa-solid fa-xmark" style="margin:0;padding:0;line-height:1;"></i>
                </button>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    function openMediaViewer(url, type) {
        const modal = document.getElementById('media-viewer-modal');
        const content = document.getElementById('media-viewer-content');
        // Remove qualquer mídia anterior
        Array.from(content.querySelectorAll('img,video')).forEach(el => el.remove());
        let el;
        if (type === 'video') {
            el = document.createElement('video');
            el.src = url;
            el.controls = true;
            el.autoplay = true;
            el.style.maxWidth = '80vw';
            el.style.maxHeight = '80vh';
            el.style.borderRadius = '1rem';
            el.style.background = '#000';
        } else {
            el = document.createElement('img');
            el.src = url;
            el.alt = 'Mídia';
            el.style.maxWidth = '80vw';
            el.style.maxHeight = '80vh';
            el.style.borderRadius = '1rem';
            el.style.background = '#fff';
        }
        content.appendChild(el);
        modal.style.display = 'flex';
        setTimeout(() => { modal.style.opacity = '1'; }, 10);
        // Foco para acessibilidade
        document.getElementById('media-viewer-close').focus();
    }

    function closeMediaViewer() {
        const modal = document.getElementById('media-viewer-modal');
        modal.style.opacity = '0';
        setTimeout(() => { modal.style.display = 'none'; }, 200);
    }

    // Fechar ao clicar no fundo ou botão
    document.getElementById('media-viewer-modal').addEventListener('click', function(e) {
        if (e.target === this) closeMediaViewer();
    });
    document.getElementById('media-viewer-close').addEventListener('click', closeMediaViewer);
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('media-viewer-modal');
        if (modal.style.display === 'flex' && e.key === 'Escape') closeMediaViewer();
    });

    // --- Útil (Like) button logic: API-based ---

    // Função para buscar status de curtida e total
    async function fetchLikeStatus(commentId) {
        try {
            const res = await fetch(`/api/likes/${encodeURIComponent(commentId)}`);
            if (!res.ok) throw new Error('Erro ao buscar status de curtida');
            return await res.json(); // { liked: true/false, count: number }
        } catch (e) {
            return { liked: false, count: 0 };
        }
    }

    // Função para curtir
    async function likeComment(commentId) {
        const res = await fetch('/api/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentId })
        });
        if (!res.ok) throw new Error('Erro ao curtir');
        return await res.json(); // { liked: true, count: number }
    }

    // Função para descurtir
    async function unlikeComment(commentId) {
        const res = await fetch(`/api/likes/${encodeURIComponent(commentId)}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Erro ao descurtir');
        return await res.json(); // { liked: false, count: number }
    }

    // Função para atualizar visual do botão Útil
    function updateUsefulBtn(btn, liked, count) {
        let countSpan = btn.querySelector('.useful-count');
        if (!countSpan) {
            countSpan = document.createElement('span');
            countSpan.className = 'useful-count';
            btn.appendChild(document.createTextNode(' '));
            btn.appendChild(countSpan);
        }
        countSpan.textContent = count;
        if (liked) {
            btn.classList.add('liked-utile-btn');
            const icon = btn.querySelector('i.fa-thumbs-up');
            if (icon) icon.classList.add('text-[#f7943e]');
        } else {
            btn.classList.remove('liked-utile-btn');
            const icon = btn.querySelector('i.fa-thumbs-up');
            if (icon) icon.classList.remove('text-[#f7943e]');
        }
    }

    // Função para inicializar botões Útil (modal e principal)
    async function initUsefulButtons() {
        // Modal
        document.querySelectorAll('#comments-list .comment-card .util-btn').forEach(async btn => {
            const commentId = getCommentIdFromButton(btn);
            if (!commentId) return;
            const { liked, count } = await fetchLikeStatus(commentId);
            updateUsefulBtn(btn, liked, count);
            btn.onclick = async function() {
                btn.disabled = true;
                try {
                    let current = await fetchLikeStatus(commentId);
                    let result;
                    if (!current.liked) {
                        result = await likeComment(commentId);
                    } else {
                        result = await unlikeComment(commentId);
                    }
                    // Atualiza todos os botões do mesmo comentário (modal e principal)
                    document.querySelectorAll('button').forEach(b => {
                        if (getCommentIdFromButton(b) === commentId) {
                            updateUsefulBtn(b, result.liked, result.count);
                        }
                    });
                } finally {
                    btn.disabled = false;
                }
            };
        });
        // Página principal
        document.querySelectorAll('#reviews .card-hover button').forEach(async btn => {
            if (!btn.textContent.includes('Útil')) return;
            const commentId = getCommentIdFromButton(btn);
            if (!commentId) return;
            const { liked, count } = await fetchLikeStatus(commentId);
            updateUsefulBtn(btn, liked, count);
            btn.onclick = async function() {
                btn.disabled = true;
                try {
                    let current = await fetchLikeStatus(commentId);
                    let result;
                    if (!current.liked) {
                        result = await likeComment(commentId);
                    } else {
                        result = await unlikeComment(commentId);
                    }
                    document.querySelectorAll('button').forEach(b => {
                        if (getCommentIdFromButton(b) === commentId) {
                            updateUsefulBtn(b, result.liked, result.count);
                        }
                    });
                } finally {
                    btn.disabled = false;
                }
            };
        });
    }

    // Após renderizar comentários, inicializa botões Útil
    const origRenderComments = renderComments;
    renderComments = function(list) {
        origRenderComments(list);
        initUsefulButtons();
    };

    // Ao abrir modal ou carregar página, inicializa botões Útil
    seeMoreBtn.addEventListener('click', openModal);
    document.addEventListener('DOMContentLoaded', function() {
        initUsefulButtons();
    });
});
