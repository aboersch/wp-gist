# wp-gist

Install into wordpress via FTP to put Github Gists into a collapsable wrapper with clipboard support.


Usage:
```
...
<div rawUrl="https://gist.githubusercontent.com/aboersch/a027f8757348bdacbcbb5aa85612d045/raw/0cec386eab551cdaa65df3d94c56fad910378b0e/ghost-network-adapters-powershell.ps1" class="gistContainer">
    <div class="gistScriptContainer">
        <script src="https://gist.github.com/aboersch/a027f8757348bdacbcbb5aa85612d045.js"></script>
    </div>
</div>
...
<script>com.aboersch.wp.GistContainer.init();</script>
```

Example:
<script src="/wp-gist/index.js"></script>
<div rawUrl="https://gist.githubusercontent.com/aboersch/a027f8757348bdacbcbb5aa85612d045/raw/0cec386eab551cdaa65df3d94c56fad910378b0e/ghost-network-adapters-powershell.ps1" class="gistContainer">
    <div class="gistScriptContainer">
        <script src="https://gist.github.com/aboersch/a027f8757348bdacbcbb5aa85612d045.js"></script>
    </div>
</div>
<script>com.aboersch.wp.GistContainer.init();</script>