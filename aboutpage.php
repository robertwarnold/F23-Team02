<?php
include("database.php");
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About Page Demo</title>
        <link rel="stylesheet" href="layout.css">
    </head>
    <body>
        <header>
            <h1>About Page Demo</h1>
        </header>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
            </ul>
        </nav>
        <main>
            <table>
                <?php
                    $ABOUT_PAGE_DATA = fetch_about_page();
                ?>
                <tr>
                    <td> Project Name: </td>
                    <td> <?php echo $ABOUT_PAGE_DATA['ProductName']; ?> </td>
                </tr>
                <tr>
                    <td> Version Number: </td>
                    <td> <?php echo $ABOUT_PAGE_DATA['Version']; ?> </td>
                </tr>

            </table>

        </main>
        <script src="script,.js"></script>
    </body>
</html>