// Create group action dinamically
function createGroupAction() {
    $('.menu-bar-group>a').on('click', function (event) {
        let hasClass = $(this).parent().hasClass('active');

        if (hasClass) {
            $(this).parent().removeClass('active');
        } else {
            $(this).parent().addClass('active');
        }

        event.stopPropagation()
    });
}

// Create menu items references dinamically
function createMenuItemReferences() { 
    let items = $('.menu-bar').find('.menu-bar-link');
    for (let i = 0; i < items.length; i++) {
        let current = items[i];

        $(current).attr('link-ref', i);

        if (i > 0) {
            $(current).attr('prev-link-ref', i - 1);
        }

        if (i < items.length - 1) {
            $(current).attr('next-link-ref', i + 1);
        }
    }
}

// Create menu item action dinamically
function createMenuItemAction() {
    $('.menu-bar-item').on('click', function (event) {
        // Remove active class from other links
        $('.menu-bar-item.active').removeClass('active');

        // Add active class to target link
        $(this).addClass('active');

        let url = $(this).find('.menu-bar-link').attr('link') ?? '';

        // Load the content
        if (url !== '') {
            $.ajax({
                'url': `pages/${url}`,
                'type': 'GET',
                'success': function (data) {
                    $('.content').removeClass('content-bg-home');
                    $('.content').html(data);
                }
            });
        }

        $('a[ref="footer-prev-link"]').unbind('click');
        $('a[ref="footer-next-link"]').unbind('click');

        // Get previous and next references
        let prevLinkRef = $(this).find('.menu-bar-link').attr('prev-link-ref') ?? '';
        let nextLinkRef = $(this).find('.menu-bar-link').attr('next-link-ref') ?? '';

        // Set previous references on footer
        if (prevLinkRef === '') {
            $('a[ref="footer-prev-link"]').addClass('d-none');
        } else {
            let prevElement = $(`[link-ref=${prevLinkRef}]`);
            let prevText = $(prevElement).text();
            
            $('a[ref="footer-prev-link"]').removeClass('d-none');
            $('a[ref="footer-prev-link"]').on('click', () => {
                $(prevElement).click()
            });
            $('div[ref="footer-prev-text"]').text(prevText);
        }

        // Set next references on footer
        if (nextLinkRef === '') {
            $('a[ref="footer-next-link"]').addClass('d-none');
        } else {
            let nextElement = $(`[link-ref=${nextLinkRef}]`);
            let nextText = $(nextElement).text();
            
            $('a[ref="footer-next-link"]').removeClass('d-none');
            $('a[ref="footer-next-link"]').on('click', () => {
                $(nextElement).click()
            });
            $('div[ref="footer-next-text"]').text(nextText);
        }

        event.stopPropagation();
    });
}

$().ready(() => {
    createGroupAction();
    createMenuItemReferences();
    createMenuItemAction();
});
