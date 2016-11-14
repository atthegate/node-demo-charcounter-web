# node-demo-charcounter-web

Character Counter Using Local Client-Server with Web Output

This is a simple Node.js demo of a client-server service that counts the number of characters (case-sensitive) in a user-input string, very similar to my <code>node-demo-charcounter-local</code> project. However, this variant has an additional web output, consisting of either simple text or barchart plotting of the character count results.

<ul>
<li>Start the server in a terminal, <code>node node-demo-charcounter-server.js</code>, using either 'text' or 'bar' as a CLI argument to indicate which web page output you want.</li>
<li>Open the corresponding 'text.html' or 'bar.html' in a browser. 
<li>Run the client script with an arbitrary input string,<code>node node-demo-charcounter-client.js 'I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.'</code></li>
<li>The server terminal window will then update with a character mapping of each character in the string, with the corresponding count of how many times each character occurred in the string.</li>
<li>Additionally, the web page should update to reflect the character count results.</li>
<li>Sending multiple strings to the server will result in an aggregated count of characters.</li>
<li>Sending a reset command to the server will reset the character count, <code>node node-demo-charcounter-client.js 'RESET-CM'</code></li>
</ul>

<b>Client</b>
![Alt text](screenshots/screenshot_node-charcounter-client.png?raw=true "Client")
<br>
<b>Server (Text)</b>
![Alt text](screenshots/screenshot_node-charcounter-server_text.png?raw=true "Server (Text)")
<br>
![Alt text](screenshots/screenshot_node-charcounter-web_text.png?raw=true "Web (Text)")
<br>
<b>Server (Bar)</b>
![Alt text](screenshots/screenshot_node-charcounter-server_bar.png?raw=true "Server (Bar)")
<br>
![Alt text](screenshots/screenshot_node-charcounter-web_bar.png?raw=true "Web (Bar)")
