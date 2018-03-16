$(document).ready(() => {

    let books = [];
    
    // ajax call
    $.ajax({
        method:"GET",
        url: "http://www.json-generator.com/api/json/get/cfUffYzlmG?indent=2",
        dataType: "json",
        success: (data) => {

            books = data;
           
            console.log(data);
            
        },
        error: (err) => {
            console.log(err);
        }
    })

    $("#getData").on("click", () => {
        populateTable(books);
    });


    // show all books and fil lthe table
    function populateTable(data) {

        $("#tableBody").html("");

        let seriesContent;
        let isbnContent;
        let reviewContent;

        for (let i = 0; i < data.length; i++) {

            if (data[i].series != null) {
                seriesContent = data[i].series;
            } else {
                seriesContent = "";
            }

            if (data[i].ISBN != null) {
                isbnContent = data[i].ISBN;
            } else {
                isbnContent = "";
            }

            if (data[i].review != null) {
                reviewContent = data[i].review;
            } else {
                reviewContent = "";
            }

            $("#tableBody").append(`
                <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].kind}</td>
                    <td id="title-${i}">${data[i].title}</td>
                    <td>${data[i].author}</td>
                    <td>${data[i].year} (${data[i].publisher})</td>
                    <td>${data[i].length}</td>
                    <td>${seriesContent}</td>
                    <td>${isbnContent}</td>
                    <td>${reviewContent}</td>
                    <td>
                        <button id="delete-${i}">Delete</button>
                        <button id="edit-${i}">Edit</button>
                        <button id="save-${i}">Save</button>
                    </td>
                </tr>
            `);

            $(`#save-${i}`).hide();

            $(`#delete-${i}`).off("click").on("click", () => {
                books = books.filter(item => item.title !== $(`#title-${i}`).text());
                filterBooks(books);
            });

            $(`#edit-${i}`).on("click", () => {
                $(`#delete-${i}`).hide();
                $(`#edit-${i}`).hide();
                $(`#save-${i}`).show();
            })

            $(`#save-${i}`).on("click", () => {
                $(`#delete-${i}`).show();
                $(`#edit-${i}`).show();
                $(`#save-${i}`).hide();
            })
        }
    }

    // show novel or anthology
    $("#showNovel").on("click", () => {
        tempbooks = filterBooks(books, "novel");
    })

    $("#showAnthology").on("click", () => {
        tempbooks = filterBooks(books, "anthology");
    })

    function filterBooks(data, filter) {
        switch(filter) {
            case "novel":
                data = data.filter(item => item.kind === "novel");
                break;
            case "anthology":
                data = data.filter(item => item.kind === "anthology");
                break;
            default:
                break;
        }

        populateTable(data);
    }

    // choose what kind of book to add
    $(".form").append(`
        <div>
            <label for="addTitle">Enter Title</label>
            <input type="text" id="addTitle" placeholder="...">
        </div>
        <div>
            <label for="addAuthor">Enter Author</label>
            <input type="text" id="addAuthor" placeholder="...">
        </div>
        <div>
            <label for="addPublisher">Choose Publisher</label>
            <select id="addPublisher">
                <option value="Gollancz" selected>Gollancz</option>
                <option value="Matica">Matica</option>
                <option value="Tri">Tri</option>
            </select>
        </div>
        <div>
            <label for="addReleseYear">Enter Release Year</label>
            <input type="text" id="addReleseYear" placeholder="...">
        </div>
        <div>
            <label for="addLength">Enter Book Length</label>
            <input type="text" id="addLength" placeholder="...">
        </div>
        <div>
            <label for="addISBN">Add ISBN</label>
            <input type="text" id="addISBN" placeholder="...">
        </div>
        <div>
            <label for="addReview">Write Review</label>
            <textarea id="addReview" placeholder="enter review here"></textarea>
        </div>

        <button id="insert" type="submit">Add Novel Book</button>
    `);

    $("#addKind").on("change", () => {

        $(".form").html("");

        if ($("#addKind").val() === "novel") {
            
            $(".form").append(`
                <div>
                    <label for="addTitle">Enter Title</label>
                    <input type="text" id="addTitle" placeholder="...">
                </div>
                <div>
                    <label for="addAuthor">Enter Author</label>
                    <input type="text" id="addAuthor" placeholder="...">
                </div>
                <div>
                    <label for="addPublisher">Choose Publisher</label>
                    <select id="addPublisher">
                        <option value="Gollancz" selected>Gollancz</option>
                        <option value="Matica">Matica</option>
                        <option value="Tri">Tri</option>
                    </select>
                </div>
                <div>
                    <label for="addReleseYear">Enter Release Year</label>
                    <input type="text" id="addReleseYear" placeholder="...">
                </div>
                <div>
                    <label for="addLength">Enter Book Length</label>
                    <input type="text" id="addLength" placeholder="...">
                </div>
                <div>
                    <label for="addISBN">Add ISBN</label>
                    <input type="text" id="addISBN" placeholder="...">
                </div>
                <div>
                    <label for="addReview">Write Review</label>
                    <textarea id="addReview" placeholder="enter review here"></textarea>
                </div>

                <button id="insert" type="submit">Add Novel Book</button>
            `);
        }

        if ($("#addKind").val() === "anthology") {

            $(".form").append(`
                <div>
                    <label for="addTitle">Enter Title</label>
                    <input type="text" id="addTitle" placeholder="...">
                </div>
                <div>
                    <label for="addAuthor">Enter Editor</label>
                    <input type="text" id="addAuthor" placeholder="...">
                </div>
                <div>
                    <label for="addPublisher">Enter Publisher</label>
                    <input type="text" id="addPublisher" placeholder="...">
                </div>
                <div>
                    <label for="addReleseYear">Enter Release Year</label>
                    <input type="text" id="addReleseYear" placeholder="...">
                </div>
                <div>
                    <label for="addISBN">Enter Book Length</label>
                    <input type="text" id="addISBN" placeholder="...">
                </div>
                <div>
                    <label for="addISBN">Add ISBN</label>
                    <input type="text" id="addISBN" placeholder="...">
                </div>
                <div>
                    <label for="addReview">Write Review</label>
                    <textarea id="addReview" placeholder="enter review here"></textarea>
                </div>

                <button id="insert" type="submit">Add Anthology Book</button>
            `);
        }      
    })

    // add new book
    $("#insert").on("click", (e) => {

        e.preventDefault();

        let newBook = new Object();

        newBook.id = books.length + 1;
        newBook.kind = $("#addKind").val();
        newBook.title = $("#addTitle").val();
        newBook.author = $("#addAuthor").val();
        newBook.publisher = $("#addPublisher").val();
        newBook.year = $("#addReleseYear").val();
        newBook.length = $("#addLength").val();
        newBook.ISBN = $("#addISBN").val();
        newBook.review = $("#addReview").val();
        
        

        books.push(newBook);

        formReset();
        function formReset() {
            document.form.reset();
        }

        populateTable(books);
    })


    

    // sorting
    $('th').click(function () {
        let table = $(this).parents('table').eq(0)
        let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        // alert(($(this).index()));
        this.asc = !this.asc
        if (!this.asc) { rows = rows.reverse() }
        for (let i = 0; i < rows.length; i++) { table.append(rows[i]) }
    })

    function comparer(index) {
        return function (a, b) {
            let valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
        }
    }

    function getCellValue(row, index) { 
        return $(row).children('td').eq(index).text() 
    }

})