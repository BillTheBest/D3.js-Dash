<?php 

    // Specify database from $arg[1] //
    $dir = 'sqlite:livedb.sqlite';

    // Instantiate PDO connection object or failure msg //
    $dbh = new PDO($dir) or die("cannot open database");

    // Define your SQL statement //
    $query = 'SELECT * from ICD LIMIT 40';
    
    // Iterate through the results and pass into JSON encoder //
    
    $json = array(); 
    
    foreach ($dbh->query($query) as $row) {

        $item = array(
            'source' => (string)$row[0],
            'target' => (string)$row[1],
            'description' => (string)$row[2],
            'short' => (string)$row[3],
            'long' => (string)$row[4]
        );

        $json[] = $item;

    }
        echo json_encode($json);
?> 
