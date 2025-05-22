$(document).ready(function() {
    // 紀念墓園數據
    const memorialData = [
        {
            id: 1,
            name: "張家家族墓園",
            description: "簡約現代的家族墓園，環境優美寧靜",
            image: "img/memorial1.jpg",
            category: "family"
        },
        {
            id: 2,
            name: "林先生紀念碑",
            description: "精緻雕刻的大理石紀念碑，設計典雅",
            image: "img/memorial2.jpg",
            category: "memorial"
        },
        {
            id: 3,
            name: "王氏個人墓園",
            description: "獨特設計的個人墓園，融合傳統與現代元素",
            image: "img/memorial3.jpg",
            category: "individual"
        },
        {
            id: 4,
            name: "李家家族墓園",
            description: "寬敞明亮的家族墓園，適合大型家族使用",
            image: "img/memorial4.jpg",
            category: "family"
        },
        {
            id: 5,
            name: "陳氏個人墓園",
            description: "簡約莊嚴的個人墓園，環境清幽",
            image: "img/memorial5.jpg",
            category: "individual"
        },
        {
            id: 6,
            name: "吳家紀念碑",
            description: "藝術風格設計的紀念碑，獨特且莊嚴",
            image: "img/memorial6.jpg",
            category: "memorial"
        }
    ];    // 動態生成紀念墓園內容
    function renderMemorials(filter = 'all') {
        const $grid = $('.memorial-grid');
        $grid.empty();

        const filteredData = filter === 'all' 
            ? memorialData 
            : memorialData.filter(item => item.category === filter);

        filteredData.forEach(item => {
            // 創建一個包含HTML的變數
            let memorialHTML = `
                <div class="memorial-item fade-in" data-category="${item.category}">`;
            
            // 檢查圖片是否存在
            const img = new Image();
            img.src = item.image;
            
            // 無論圖片是否存在，都先添加Memorial資訊區塊
            memorialHTML += `
                    <div class="memorial-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <a href="#contact" class="btn">了解更多</a>
                    </div>
                </div>
            `;
            
            const $memorialItem = $(memorialHTML);
            
            // 即時檢測圖片是否能夠加載
            img.onload = function() {
                // 圖片存在，使用實際圖片
                $memorialItem.css({
                    'background-image': `url(${item.image})`,
                    'background-size': 'cover',
                    'background-position': 'center'
                });
            };
            
            img.onerror = function() {
                // 圖片不存在，使用佔位元素
                $memorialItem.prepend(`
                    <div class="placeholder-image" style="background-color: #34495e; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white;">
                        <i class="fas fa-monument" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <div style="text-align: center; padding: 0 20px;">
                            <h3>${item.name}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `);
            };
            
            $grid.append($memorialItem);
        });

        // 觸發動畫效果
        setTimeout(() => {
            $('.memorial-item').addClass('active');
        }, 100);
    }

    // 初始化紀念區
    renderMemorials();

    // 紀念區過濾功能
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        const filter = $(this).data('filter');
        renderMemorials(filter);
    });

    // 導航欄漢堡按鈕功能
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // 平滑滾動
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const target = this.hash;
        const $target = $(target);
        
        if ($target.length) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 80
            }, 900, 'swing', function() {
                window.location.hash = target;
            });
            
            // 如果導航欄處於開啟狀態，則關閉它
            if ($('.nav-links').hasClass('active')) {
                $('.nav-links').removeClass('active');
            }
        }
    });

    // 滾動動畫效果
    function fadeInElements() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('active');
            }
        });
    }

    // 頁面載入後和滾動時執行動畫
    $(window).on('load scroll', fadeInElements);

    // 初始化滑動效果
    if ($.fn.slick) {
        $('.testimonial-slider').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
    } else {
        console.warn('Slick carousel not loaded');
    }    // 表單提交處理
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // 表單驗證
        const name = $('#name').val();
        const email = $('#email').val();
        const phone = $('#phone').val();
        const message = $('#message').val();
        
        // 簡易驗證
        if (name && email && message) {
            // 表單提交按鈕狀態
            const $submitBtn = $(this).find('button[type="submit"]');
            const originalText = $submitBtn.text();
            $submitBtn.prop('disabled', true).text('提交中...');
            
            // 使用Formspree服務發送表單
            const formData = new FormData(this);
            
            // 注意：替換為您的Formspree表單ID
            const formspreeUrl = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
            
            fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('表單提交失敗');
            })
            .then(data => {
                // 提交成功
                alert('感謝您的留言，我們將盡快回覆您。');
                this.reset();
            })
            .catch(error => {
                // 提交失敗
                console.error('提交表單時發生錯誤:', error);
                alert('很抱歉，表單提交失敗，請稍後再試或直接電話聯繫我們。');
            })
            .finally(() => {
                // 恢復按鈕狀態
                $submitBtn.prop('disabled', false).text(originalText);
            });
        } else {
            alert('請填寫所有必填欄位。');
        }
    });// 處理關於我們區域的圖片
    function setupGardenImage() {
        const $gardenImg = $('#garden-img');
        
        // 預先檢查圖片是否存在
        const img = new Image();
        img.onload = function() {
            // 圖片存在，無需處理
            console.log('園區圖片載入成功');
        };
        
        img.onerror = function() {
            // 圖片不存在，創建佔位圖
            const $parent = $gardenImg.parent();
            $parent.html(`
                <div style="background-color: #34495e; height: 300px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: white; border-radius: 10px;">
                    <i class="fas fa-tree" style="font-size: 3rem; margin-bottom: 15px;"></i>
                    <h3>紀念公園景觀</h3>
                    <p>寧靜祥和的園區環境</p>
                </div>
            `);
        };
        
        // 設置圖片來源
        img.src = $gardenImg.attr('src');
    }
    
    // 執行函數檢查圖片
    setupGardenImage();// 設置英雄區的背景
    function setupHeroBackground() {
        // 檢查 hero-bg.jpg 是否存在
        const heroImg = new Image();
        heroImg.onload = function() {
            // 圖片存在，使用實際圖片作為背景
            $('.hero').css({
                'background': 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("../img/hero-bg.jpg")',
                'background-size': 'cover',
                'background-position': 'center'
            });
        };
        heroImg.onerror = function() {
            // 圖片不存在，使用純色背景
            $('.hero').css({
                'background': 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), #2c3e50',
                'background-size': 'cover',
                'background-position': 'center'
            });
        };
        heroImg.src = 'img/hero-bg.jpg';
    }
    
    setupHeroBackground();
});