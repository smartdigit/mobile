<?
//Connection to webservice
include('ws.php');

//Local data base connection
$dbname='db.db';
$db=new SQLite3($dbname, 0666);


//Last synconization date query
$query = "SELECT LastSyncDate
		  FROM synclog 
		  ORDER BY Id Desc
		  LIMIT 1";
$results = $db->query($query);
$row = $results->fetchArray();

//Check for query result
if(count($row)>0){
	//Call the items webservice function
	$data = $client->SQLiteItems($row['LastSyncDate']);
	
	//While exists data
	foreach($data as $var){
		//Insert or replace data to local data base
		$query = "INSERT OR REPLACE INTO item (ItemId, UnitOfSaleID, Barcode, ItemPictureName) 
					VALUES ('".$var->ItemID."', '".$var->UnitOfSaleID."', '".$var->Barcode."', '".$var->ItemPicture."')";
		$results = $db->query($query);
	}

}

/*echo('<pre>');
print_r($data);
echo('<pre>');*/

?>