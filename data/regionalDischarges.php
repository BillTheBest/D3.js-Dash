<?php 

    // Specify database from $arg[1] //
    $dir = 'sqlite:livedb.sqlite';

    // Instantiate PDO connection object or failure msg //
    $dbh = new PDO($dir) or die("cannot open database");

    // Define your SQL statement //
    $query = 'SELECT * FROM regionalDischarges'; 
    
    // Iterate through the results and pass into JSON encoder //
    
    $json = array(); 
    
    foreach ($dbh->query($query) as $row) {

        $item = array(
            'City' => (string)$row[0],
            'data' => (string)$row[1],
            'FIPS' => (string)$row[2],
            'Lat'  => (string)$row[3],
            'Long' => (string)$row[4],
            'SD'   => (string)$row[5],
            'Zip'  => (string)$row[6]
        );

        $json[] = $item;

    }
        echo json_encode($json, JSON_UNESCAPED_SLASHES);
?> 

