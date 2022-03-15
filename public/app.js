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

const loggedIn = localStorage.getItem("login");
if (loggedIn === "success") {
    const $blogPostBar = $(`<div class="input-group mb-3">
    <input type="text" class="form-control" id="blog-entry" placeholder="What did you do today?" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-dark" type="button" id="submit-button" onClick="submitBlog()">Submit</button>
  </div>`);
    $blogPostBar.prependTo($blogContainer);
}


$passwordEntry.on("keyup", function(event) {
    if (event.keyCode === 13) {
        $.get(BASE_URL + "/login/" + $passwordEntry.val(), (data) => {
            if (data === "Success") {
                localStorage.setItem("login", "success")
                $blog.css("height: 80%");
                const $blogPostBar = $(`<div class="input-group mb-3">
                <input type="text" class="form-control" id="blog-entry" placeholder="What did you do today?" aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-dark" type="button" id="submit-button" onClick="submitBlog()">Submit</button>
              </div>`);
                $blogPostBar.prependTo($blogContainer);

            }
        });
    }
});



function submitBlog() {
    const $blogEntry = $("#blog-entry");
    const $blogButton = $("#submit-button");
    const post = $blogEntry.val();

    if (post.length <= 1) {
        alert("Oops! That message is too short!");
        return -1;
    } else {
        if (confirm('Are you sure you want to add: \n"' + post + '"?') == true) {
            const blogData = JSON.stringify({ data: post });
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