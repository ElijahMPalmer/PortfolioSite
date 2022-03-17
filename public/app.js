new fullpage("#fullpage", {
    autoScrolling: true,
    navigation: true,
    controlArrows: false,
    slidesNavigation: true,
    slidesNavPosition: "bottom",
    anchors: ["section1", "section2", "section3"],
});

const BASE_URL = window.location.origin;

printBlogPosts();
const $passwordEntry = $("#admin-login");
const $blog = $("#blog");
const $blogPage = $(".s3");
const $blogContainer = $("#blog-container");

$passwordEntry.on("submit", function(e) {

});



$passwordEntry.on("keyup", function(event) {
    if (event.keyCode === 13) {
        $.get(BASE_URL + "/login/" + $passwordEntry.val(), (data) => {
            if (data === "Success") {
                localStorage.setItem("login", "success")
                const $blogPostBar = $(`<textarea name="editor1" id="editor1" rows="10" cols="80"></textarea><button class="btn btn-dark" type="button" id="submit-button" onClick="submitBlog()">Submit</button>`);
                $blogPostBar.prependTo($blogContainer);
                CKEDITOR.replace('editor1');
                $blog.css("height", "30%")

            }
        });
    }
});



function submitBlog() {
    $blog.empty();
    const data = CKEDITOR.instances.editor1.getData();
    if (data.length <= 1) {
        alert("Oops! That message is too short!");
        return -1;
    } else {
        if (confirm('Are you sure you want to add: \n"' + data + '"?') == true) {
            const blogData = JSON.stringify({ data: data });
            $.post({ url: BASE_URL + "/blog", contentType: "application/json; charset=utf-8", data: blogData })
                .done(function(data) {
                    alert("Data Loaded: " + data);
                    printBlogPosts();
                }, "json");
        }
    }
}

function printBlogPosts() {
    $.get(BASE_URL + "/blog", (data) => {

        for (let i = 0; i < data.length; i++) {
            const $post = $("<div class='post'></div>");

            $post.html(data[i].content);
            $post.prependTo($blog);
        }
    });
}