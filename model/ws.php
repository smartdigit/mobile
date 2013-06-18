<?php
set_time_limit(99999);
ini_set('memory_limit', '-1');

class SoapHeaderAPIToken {
	public $apikey;
	public function __construct($apikey) {
		$this->apikey = $apikey;
	}
}

$url='http://uk.monolith-gruppe.com:8181/soap/server.php';

$uri = $url.'?wsdl';
$location = $url;

// Set the login headers
$wsu = 'http://schemas.xmlsoap.org/ws/2002/07/utility';

$usernameToken = new SoapHeaderAPIToken('0000000000');
$soapHeaders[] = new SoapHeader($wsu, 'APIToken', $usernameToken);

$client = new SoapClient(@$wsdl, array( 
	"location" => $location,
	"uri" => $uri
));
$result=$client->__setSoapHeaders($soapHeaders);

?>