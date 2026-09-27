-   ## [Understanding the ‘lib not found’ Error When Running HydraDX on Docker](https://mikespook.com/2023/09/understanding-the-lib-not-found-error-when-running-hydradx-on-docker/)
    
    ## Background
    
    I’ve been working with HydraDX recently and attempting to run it in Docker. Unfortunately, the last runnable version of HydraDX is significantly outdated, and it no longer connects to active peers. Furthermore, when attempting to use a more recent HydraDX Docker image, an error arises indicating “version \`GLIBC\_2.34′ not found.” As of the most recent version available on September 4th, 2023, identified as pr-664, this issue still persists without resolution. Following a period of challenges and without delving into the underlying causes of the issue, I decided to immerse myself in the Rust program and scrutinize the code. Through this process, I identified some outdated configurations and instances of Docker misuse.
    
    It seems that encountering similar issue when compiling the rust program and running it in Docker environment is quite common, especially within the blockchain industry.
    
    However, please note that the focus of this post is only on building a Docker image for a Rust program (or at least a program linked with glibc). Understanding HydraDX or blockchain concepts is not necessary to grasp the content of this discussion. But with a minimal knowledge of Docker is required.
    
    [(more…)](https://mikespook.com/2023/09/understanding-the-lib-not-found-error-when-running-hydradx-on-docker/#more-2471)
    
-   ## [How to start Nginx after shared folder mounted on VirtualBox](https://mikespook.com/2021/03/how-to-start-nginx-after-shared-folder-mounted-on-virtualbox/)
    
    Recently, I set up a new developing environment in a VirtualBox VM. The source code shares between the host and VM by shared folder. It causes a problem that the config file can not be found when Nginx is starting up.
    
    [![](https://mikespook.com/wp-content/uploads/2021/03/2021-03-16_10-30-33-1024x179.png)](https://mikespook.com/wp-content/uploads/2021/03/2021-03-16_10-30-33.png)
    
    Nginx can not find the specific config file which is in the mounted folder from the host
    
    I searched on Google and found some related posts.
    
    “[If Nginx does not start after rebooting the server](https://docs.ispsystem.com/ispmanager-lite/troubleshooting-guide/if-nginx-does-not-start-after-rebooting-the-server)” points out the correct direction of the solution, however, the changes of method 1 mentioned in the article is not working for VirtualBox, and personally, I don’t like the method 2.
    
    While, “[How to mount shared folder from VirtualBox at boot time in Debian](https://unix.stackexchange.com/questions/335609/how-to-mount-shared-folder-from-virtualbox-at-boot-time-in-debian)” describes _the mount must happen after vboxadd-service.service started_.
    
    Combine this two posts, the solution would be obvious.
    
    ## Solution
    
    Change the line `/etc/systemd/system/multi-user.target.wants/nginx.service` in the configuration file of Nginx in VM
    
    ```
    After=network.target
    ```
    
    Adding `vboxadd-service.service`
    
    ```
    After=network.target vboxadd-service.service
    ```
    
    Reboot the VM.
    
    Check Nginx running status with the following command
    
    ```
    sudo service nginx status
    ```
    
    [![](https://mikespook.com/wp-content/uploads/2021/03/2021-03-16_11-11-04-1024x299.png)](https://mikespook.com/wp-content/uploads/2021/03/2021-03-16_11-11-04.png)
    
    Nginx started successfully after changes
    
    Solved!
    
-   ## [How to upload firmware to EleksMill in Linux](https://mikespook.com/2018/08/how-to-upload-firmware-to-eleksmill-in-linux/)
    
    ![](https://mikespook.com/wp-content/uploads/2018/08/EleksMill.jpg)
    
    My wife sent me an EleksMill as my birthday gift (Thank you! my love). It’s simple but proper designed desktop CNC. However, the document of the CNC machine is as simple as the design. It cost me around 4 hours to assemble the machine from a piece by piece.  
    
    After completed the assembling, I found the board was not initialised. So, I downloaded the firmware from [EleksMill website](http://wiki.eleksmaker.com/doku.php?id=eleksrom). Unfortunately, the official package only supplied the windows application to upload the firmware. For Linux, such as my OS Ubuntu, I have to find out another way to upload the program.
    
    Since EleksMill is based on Grbl, so it can use Arduino tool-chain to upload firmware.
    
    ```
    $ arduino/hardware/tools/avr/bin/./avrdude -C arduino/hardware/tools/avr/etc/avrdude.conf -v -patmega328p -Uflash:w:/home/mikespook/Downloads/EleksROM\ V3.8/firmware/mana.hex:i -carduino -b 57600 -P /dev/ttyUSB0
    ```
    
    \`avrdude\` command can be found in Arduino IDE folder \`arduino/hardware/tools/avr/bin/\` and the \`avrdude.conf\` file is in the sub-folder \`arduino/hardware/tools/avr/etc/avrdude.conf\`. 
    
-   ## [Temporary solution for Ubuntu’s “not have a Release file”](https://mikespook.com/2018/01/2280/)
    
    [![](https://mikespook.com/wp-content/uploads/2018/01/ubuntu-16.10-login-screen-bug-lightdm.jpg)](https://mikespook.com/2018/01/2280/ubuntu-16-10-login-screen-bug-lightdm/)  
    It’s wired that when I tried to update the Ubuntu zesty and install some new packages today, I got such errors below.
    
    Err:8 http://security.ubuntu.com/ubuntu zesty-security Release      
      404  Not Found \[IP: 91.189.88.161 80\]
    Err:10 http://archive.ubuntu.com/ubuntu zesty Release
      404  Not Found \[IP: 91.189.88.152 80\]
    Err:12 http://archive.ubuntu.com/ubuntu zesty-updates Release
      404  Not Found \[IP: 91.189.88.152 80\]
    Reading package lists... Done
    E: The repository 'http://security.ubuntu.com/ubuntu zesty-security Release' does no longer have a Release file.
    N: Updating from such a repository can't be done securely, and is therefore disabled by default.
    N: See apt-secure(8) manpage for repository creation and user configuration details.
    E: The repository 'http://archive.ubuntu.com/ubuntu zesty Release' does not have a Release file.
    N: Updating from such a repository can't be done securely, and is therefore disabled by default.
    N: See apt-secure(8) manpage for repository creation and user configuration details.
    E: The repository 'http://archive.ubuntu.com/ubuntu zesty-updates Release' does not have a Release file.
    N: Updating from such a repository can't be done securely, and is therefore disabled by default.
    N: See apt-secure(8) manpage for repository creation and user configuration details.
    
    And none of the other mirrors works to me. All of them has the same issue “no longer have a Release file”. I did some research and found the error message actually has another form “not have a Release file”.
    
    The **solution** is easy but tricky — Disable all sources of \`security.ubuntu.com\` and replace \`archive.ubuntu.com\` to \`old-releases.ubuntu.com\`.
    
    [(more…)](https://mikespook.com/2018/01/2280/#more-2280)
    
-   ## [\[翻译\]这根本不是 BASH 的 bug！](https://mikespook.com/2014/09/not-a-bash-bug/)
    
    在前几天看到 [CVE-2014-6277](https://en.wikipedia.org/wiki/Shellshock_\(software_bug\)) 这个 BASH 的 bug 的时候，我就觉得挺奇葩的：这这种明显是有意实现的功能怎么会存在这么大的安全隐患呢？我不是专门搞安全的，同时觉得，这个 bug 可能虽然影响广泛，但并不是什么很有技术含量的利用思路。所以我就把这个事情放下没去想它。然而，随之而来的国内国外的各种媒体宣传、安全专家的联名建议、茶余饭后的坊间畅谈……对于 BASH 的这个 bug 无人不认为是个大 bug。不少人为此还在幸灾乐祸……但是我却没从各种评论中找到我的问题的答案。
    
    但是，当我看到[这篇随笔](http://paste.lisp.org/display/143864)时，我不得不赞同作者的观点：这根本不是 BASH 的 bug！
    
    所以我将原文翻译至此，希望能够带来一些思考。
    
    也许我们今天看到的一个愚蠢的 bug，在历史上的某一天，是一个有意而为之的神奇特性。也许我们应该思考的不仅仅是这一刻的 bug 或者安全隐患本身，而是在软件项目这个极具工程和创作品双重特性的活动中，如何有效的保证某个特性不会变成 bug。所以什么规范了，文档了，可真得不是纸上谈兵！
    
    不过话说回来，无论如何，我仍然坚信：“Less is exponentially more!（大道至简）”少一点 Feature 或许就是少一点 Bug 呢？
    
    [![bug-vs-feature](https://mikespook.com/wp-content/uploads/2014/09/bug-vs-feature-300x225.gif)](https://mikespook.com/wp-content/uploads/2014/09/bug-vs-feature.gif)
    
    [(more…)](https://mikespook.com/2014/09/not-a-bash-bug/#more-1973)
    
-   ## [\[翻译\] Nginx 备战-优化指南](https://mikespook.com/2013/11/%e7%bf%bb%e8%af%91-nginx-%e5%a4%87%e6%88%98-%e4%bc%98%e5%8c%96%e6%8c%87%e5%8d%97/)
    
    对于上线优化这个事情，个人来说更加倾向于使用一些快速的调优模式首先来解决 80% 的问题。感觉上这篇“[Battle ready Nginx – an optimization guide](http://blog.zachorr.com/nginx-setup/)”讲得还是很到位了。所以随手翻译了，分享给大家。
    
    ———— 翻译分隔线 ————
    
    ## Nginx 备战-优化指南
    
    作者：Zachary Orr
    
    大多数关于 Nginx 的指南只告诉你那最基本的部分：apt-get 一个包，修改这里和那里的某些行，然后就得到了一个 web 服务器！而在大多数情况下，一个常见的 nginx 安装也能为你的网站提供良好的服务。然而如果你**的确**想进一步压榨 nginx 的性能，那么就必须走得更远一些。在这个指南中，我将会解释通过调整 nginx 中的哪些设置可以得到更好的性能，来应对大量客户端请求。同时要注意，这不是完整的调优指南。只是对一些可以调整来改进性能的设置的简单概述。请务必具体情况具体对待。
    
    [(more…)](https://mikespook.com/2013/11/%e7%bf%bb%e8%af%91-nginx-%e5%a4%87%e6%88%98-%e4%bc%98%e5%8c%96%e6%8c%87%e5%8d%97/#more-1761)
    
-   ## [让 shell 显示当前 git 的分支名称](https://mikespook.com/2013/07/%e8%ae%a9-shell-%e6%98%be%e7%a4%ba%e5%bd%93%e5%89%8d-git-%e7%9a%84%e5%88%86%e6%94%af%e5%90%8d%e7%a7%b0/)
    
    早上测试脚本的时候，偶然在这篇文章《[Git – setting up a remote repository and doing an initial push](http://thelucid.com/2008/12/02/git-setting-up-a-remote-repository-and-doing-an-initial-push/)》看到一个关于 git 的好玩东西，记录于此。
    
    根据文章的提示在 ~/.bashrc 里添加下面的内容，可以让提示符显示当前 git 的分支名称。我按照自己的习惯修改了提示符的格式。
    
    \_\_mikespook\_ps1() {
    	local none='\\\[\\033\[00m\\\]'
    	local g='\\\[\\033\[0;32m\\\]'
    	local c='\\\[\\033\[0;36m\\\]'
    	local emy='\\\[\\033\[1;33m\\\]'
    	local br='\\\[\\033\[1;41m\\\]'
    
    	local uc=$none
    	local p='$'
    	if \[ $UID -eq "0" \] ; then
        	uc=$CBR 
    		p='#'
    	fi
    	local u="${uc}${debian\_chroot:+($debian\_chroot)}\\u${none}"
    	local h="${c}\\h${none}:${g}\\w${none}"
    	echo "$u@$h\\$(\_\_git\_ps1 '\[${emy}%s${none}\]')${uc}${p}${none} "
    }
    
    export PS1=$(\_\_mikespook\_ps1)
    
    这样，就能得到效果：
    
    [![git-branch-show-in-prompt](https://mikespook.com/wp-content/uploads/2013/07/git-branch-show-in-prompt.png)](https://mikespook.com/wp-content/uploads/2013/07/git-branch-show-in-prompt.png)
    

-   ## [在 xubuntu 中使用 3G 手机作为猫上网](https://mikespook.com/2010/07/%e5%9c%a8-xubuntu-%e4%b8%ad%e4%bd%bf%e7%94%a8-3g-%e6%89%8b%e6%9c%ba%e4%bd%9c%e4%b8%ba%e7%8c%ab%e4%b8%8a%e7%bd%91/)
    
    我使用的是三星的一款3G手机，比较破烂。不过使用三星的 PC 套件可以在 Windows 下当作猫通过手机上网。在没有可接入的网络的时候还是很方便的。不过遗憾的是，我不用 Windows……每个月 300M 的流量我只用 10%，实在是浪费……所以，我想通过 xubuntu 接入 3G 手机上网。
    
    好吧，最出乎意料的是，xubuntu 下用 3G 手机上网相当简单。
    
    下面是图文混排的步骤……
    
    [(more…)](https://mikespook.com/2010/07/%e5%9c%a8-xubuntu-%e4%b8%ad%e4%bd%bf%e7%94%a8-3g-%e6%89%8b%e6%9c%ba%e4%bd%9c%e4%b8%ba%e7%8c%ab%e4%b8%8a%e7%bd%91/#more-651)
