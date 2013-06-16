<?php
$dbname='model/db.db';
$db=new SQLite3($dbname, 0666);
/*$query = "SELECT item.ItemId, itemnames.Description
		  FROM item 
			INNER JOIN itemnames ON itemnames.ItemId=item.ItemId AND Itemnames.LanguageId='ENG'";
$results = $db->query($query);
$row = $results->fetchArray();
if(count($row)>0)
{
   echo($row['ItemId']);
   echo($row['Description']);
}   */

?>