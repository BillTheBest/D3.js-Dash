<?php 

    // Specify database from $arg[1] //
    $dir = 'sqlite:livedb.sqlite';

    // Instantiate PDO connection object or failure msg //
    $dbh = new PDO($dir) or die("cannot open database");

    // Define your SQL statement //
    $query = 'SELECT * FROM procedures WHERE radius > 2 AND radius < 25 LIMIT 25';
    
    // Iterate through the results and pass into JSON encoder //
    
    $json = array(); 
    
    foreach ($dbh->query($query) as $row) {

        $item = array(
            'CPT' => (string)$row[0],
            'Description' => (string)$row[1],
            'Provider' => (string)$row[2],
            'ProviderName' => (string)$row[3],
            'radius' => (string)$row[4],
            'LocationID' => (string)$row[5],
            'LocationName' => (string)$row[6]
        );

        $json[] = $item;

    }
        echo json_encode($json);
?> 

