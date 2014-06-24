<?php 

    // Specify database from $arg[1] //
    $dir = 'sqlite:livedb.sqlite';

    // Instantiate PDO connection object or failure msg //
    $dbh = new PDO($dir) or die("cannot open database");

    // Define your SQL statement //
    $query = 'SELECT name, id FROM sankeyNodes';

    
    // Iterate through the results and pass into JSON encoder //
    
    $json = array(); 
    
    foreach ($dbh->query($query) as $row) {

        $item = array(
            'name' => (string)$row[0],
            'id' => (string)$row[1]
        );

        $json[] = $item;

    }
        echo json_encode($json, JSON_UNESCAPED_SLASHES);



?> 

