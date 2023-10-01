<?php include("database.php");?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>About Us</title>
        <link rel="stylesheet" href="aboutPage.css">
    </head>
    <body>
        <div id="banner">
            <a href="index.html">
                <img id="home" src="imgs/home-icon.png">
            </a>

            <h1 id="header">About Us</h1>

            <div class="dropdown">
                <img id="home" class="dropbtn" src="imgs/settings-icon.png">
                <div class="dropdown-content">
                    <a href="driver_account.html">Profile</a>
                    <a href="driver_settings.html">Settings</a>
                    <a href="#">Logout</a>
                </div>
            </div>
        </div>

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
                <tr>
                    <td> Project Description: </td>
                    <td> <?php echo $ABOUT_PAGE_DATA['ProductDesc']; ?> </td>
                </tr>
            </table>
        </main>

        <div id="footer">
            <footer>
                <a id="aboutUs" href="#top">About Us</a>
            </footer>
        </div>

        <script src="script.js"></script>
    </body>
</html>