new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: true,
    controlArrows: false,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    anchors: ['section1', 'section2', 'section3']
})


const $passwordEntry = $("#admin-login");

$passwordEntry.on('submit', function(e) {
    console.log('worked')
})

$passwordEntry.on('keyup', function(event) {
    if (event.keyCode === 13) {
        console.log('clicked')
    }
})