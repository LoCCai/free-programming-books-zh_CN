-   ## [Understanding the ‘lib not found’ Error When Running HydraDX on Docker](https://mikespook.com/2023/09/understanding-the-lib-not-found-error-when-running-hydradx-on-docker/)
    
    ## Background
    
    I’ve been working with HydraDX recently and attempting to run it in Docker. Unfortunately, the last runnable version of HydraDX is significantly outdated, and it no longer connects to active peers. Furthermore, when attempting to use a more recent HydraDX Docker image, an error arises indicating “version \`GLIBC\_2.34′ not found.” As of the most recent version available on September 4th, 2023, identified as pr-664, this issue still persists without resolution. Following a period of challenges and without delving into the underlying causes of the issue, I decided to immerse myself in the Rust program and scrutinize the code. Through this process, I identified some outdated configurations and instances of Docker misuse.
    
    It seems that encountering similar issue when compiling the rust program and running it in Docker environment is quite common, especially within the blockchain industry.
    
    However, please note that the focus of this post is only on building a Docker image for a Rust program (or at least a program linked with glibc). Understanding HydraDX or blockchain concepts is not necessary to grasp the content of this discussion. But with a minimal knowledge of Docker is required.
    
    [(more…)](https://mikespook.com/2023/09/understanding-the-lib-not-found-error-when-running-hydradx-on-docker/#more-2471)
    
-   ## [Enhancing Team Cooperation: The Power of Three Concentric Circles and Essential Principles](https://mikespook.com/2023/05/enhancing-team-cooperation-the-power-of-three-concentric-circles-and-essential-principles/)
    
    [![](https://mikespook.com/wp-content/uploads/2023/05/3cc.jpg)](https://mikespook.com/wp-content/uploads/2023/05/3cc.jpg)
    
    By visualising team cooperation through these 3 concentric circles (owned, learnt, known), team members can develop a strong sense of personal responsibility, foster collaboration and learning within the team, and gain a broader understanding of the larger context in which they operate. This approach promotes a holistic and effective teamwork dynamic.
    
    1.  Owned Circle: Take full responsibility for individual work.
    2.  Learnt Circle: Understand and learn about others’ work that may impact own tasks.
    3.  Known Circle: Ensure the team’s goals and the work of all team members are known to everybody.
    
    And there are four points as essential aspects of effective team cooperation when we are considering 3cc.
    
    1.  Individual Responsibility: Each team member takes full ownership and responsibility for their own work. No one should take responsibility away from others in routine tasks.
    2.  Cross-Functional Learning: Team members actively learn about the work of their colleagues, fostering a comprehensive understanding of how others’ outcomes may affect their own tasks.
    3.  Shared Understanding of Goals: The team’s goals and objectives must be known and agreed upon by all team members. It is important to ensure that everyone is aligned with the common purpose and direction.
    4.  Work Awareness: Team members should have awareness and knowledge of each other’s roles, responsibilities, and ongoing work. This understanding promotes collaboration, coordination, and support among team members.
    
    In urgent incidents, when everyone is under pressure, it is crucial to trust individuals in their owned circle to take responsibility and provide solutions. Therefore, offering support rather than asking questions or giving orders can significantly ease the situation. Shifting the communication approach from asking others, ‘Have you done…/You should do…’ to considering ‘What can I do?’ or asking, ‘Can I offer any help on…?’ accelerates the problem-solving process and fosters a better team dynamic. This not only speeds up the resolution progress but also improves the overall well-being of everyone involved.
    

-   ## [SYNC ESP8266 BOARD DATETIME WITH NTP (DAY 2)](https://mikespook.com/2020/03/sync-esp8266-board-datetime-with-ntp-day-2/)
    
    To follow yesterday progress, I will use the board to fetch the index page of example.org in two scenarios,
    
    -   Get an URL served on HTTP
    -   Get an URL served on HTTPS
    
    There are multiple ways to finish the job, for example, there are different libraries can be used, or, even in the same library, there are still multiple options to implement the same function. So, please notice here, what I mentioned below just a functional way. It’s not the only solution nor the best solution.
    
    ### Get an URL served on HTTP
    
    The ESP8266 library has really good examples related to HTTPClient, HTTPSClient etc. I copied the source code from the example and made a little change to get an easy output.
    
    #include <WiFiClient.h>
    
    WiFiClient client;
    
    void getURL(String url) {  
      HTTPClient http;  
      if (http.begin(client, url)) {
        Serial.print("\[HTTP\] GET ... ");
        // start connection and send HTTP header
        int httpCode = http.GET();
        // httpCode will be negative on error
        if (httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("code: %d\\n", httpCode);
          // file found at server
          if (httpCode == HTTP\_CODE\_OK || httpCode == HTTP\_CODE\_MOVED\_PERMANENTLY) {
            String payload = http.getString();
            Serial.printf("Payload: %d byte\\n", payload.length());
            blink(2);
          }
        } else {
          Serial.printf("failed, error: %d %s\\n", httpCode, http.errorToString(httpCode).c\_str());
          blink(5);
        }
        http.end();
      } else {
        Serial.printf("\[HTTP} Unable to connect\\n");
        blink(5);
      }
    }
    
    For a successful case, it will return the length of the payload.
    
    ![](https://mikespook.com/wp-content/uploads/2020/03/2020-03-28_13-26-57.png)
    
    Return the length of the payload
    
    Or if anything unusual happened, it returns the error code and message. Such as,
    
    ![](https://mikespook.com/wp-content/uploads/2020/03/2020-03-28_13-39-04.png)
    
    Return error code and error message
    
    ### Establish an HTTPS request
    
    To establish an HTTPS request, replace <WiFiClient.h> to <WiFiClientSecure.h> and find a way to validate with the server. In the example “[BearSSL\_Validation.ino](https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266WiFi/examples/BearSSL_Validation/BearSSL_Validation.ino)“, most possible ways have been discussed and compared. It’s worth to read. In `fetchCertAuthority()` , it shows what will happen with and without NTP synced. I will put the screenshot of the result of the example here.
    
    ![](https://mikespook.com/wp-content/uploads/2020/03/2020-03-28_17-38-52.png)
    
    Output of ‘fetchCertAuthority()’ in ‘[BearSSL\_Validation.ino](https://github.com/esp8266/Arduino/blob/master/libraries/ESP8266WiFi/examples/BearSSL_Validation/BearSSL_Validation.ino)‘
    
    Therefore, the major change would be replacing <WiFiClient.h> to <WiFiClientSecure.h> and using WiFiClientSecure instance instead of WiFiClient. An extra setup is needed.
    
    #include <WiFiClientSecure.h>
    
    WiFiClientSecure client;
    static const char digicert\[\] PROGMEM = R"EOF(
    // Something here
    )EOF";
    X509List\* cert;
    
    void setupSecure() {  
      cert = new X509List(digicert);
      client.setTrustAnchors(cert);  
    }
    
    To get the content of `digicert`, I used the following command and copy and paste the content to replace \`Something here\` above.
    
    echo -n | openssl s\_client -connect example.org:443     | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p'
    
    ### Assembling
    
    Then we can have simple `setup()`and `loop()` by assembling all these functions together.
    
    void setup() {  
      Serial.begin(115200);
      pinMode(LED\_BUILTIN, OUTPUT);
      connectWiFi("your-ssid", "your-pass");
      setDateTime();  
      setupSecure();
    }
    
    void loop() {    
      getDateTime();
      getURL("https://example.org");
      delay(1000);
    }
    
    The whole source code has been put on [gist](https://gist.github.com/mikespook/6197dc566a4ac9fa1281491b8ab4e559). I strongly suggest you give a try to disable and enable [line 56](https://gist.github.com/mikespook/6197dc566a4ac9fa1281491b8ab4e559#file-ntp-ino-L56) to see how HTTPS affects by NTP.
    
-   ## [Sync ESP8266 board DateTime with NTP (Day 1)](https://mikespook.com/2020/03/sync-esp8266-board-datetime-with-ntp-day-1/)
    
    Most of the times, I want my ESP8266 board to communicate with the server through a securer channel such as MQTT over TLS or HTTPS. However, to verify the certification, system’s date/time has to be in a proper configuration.
    
    Since ESP8266 is designed to have the network, I believe [NTP](https://en.wikipedia.org/wiki/Network_Time_Protocol) is definitely the first choice and is the easiest one to use. In this post, I will show you how to get date/time and set it by using NTP.
    
    ## Dummy project
    
    A dummy project is set up for this post. And of course, it can be a part of a real project since the WWW is very important to my most of side projects. The board will do,
    
    -   Connect to the WiFi network;
    -   Use the `GET` method communicate with www.example.com every 5 seconds;
    -   Flash build-in LED twice if 200 was returned by the server;
    -   Or flash build-in LED 5 times if an error occurred.
    
    Flash LED is the easiest part. But remember to put `pinMode(LED_BUILTIN, OUTPUT);` in the very beginning to initialise the output pin.
    
    void blink(int t) {
      for(int i = 0; i &lt; t; i ++) {
        digitalWrite(LED\_BUILTIN, LOW);
        delay(500);
        digitalWrite(LED\_BUILTIN, HIGH);
        delay(200);
      }
    }
    
    [(more…)](https://mikespook.com/2020/03/sync-esp8266-board-datetime-with-ntp-day-1/#more-2345)
    
-   ## [Open book collections](https://mikespook.com/2016/06/open-book-collections/)
    
    All the websites below have a plenty of books and papers for free reading & downloading.
    
    [The National Academies Press](http://www.nap.edu/), free reading and downloading in PDF, account needed for downloading.
    
    [Australian National University Open Research Library](https://digitalcollections.anu.edu.au/), all materials come from ANU, fill a form to request the PDF copy.
    
    [The University of Adelaide > Library > eBooks](https://ebooks.adelaide.edu.au/), free reading and downloading in HTML, epub, and Kindle.
    
    [Curtin University Library](http://espace.library.curtin.edu.au/), free reading and downloading in PDF.
    
    [University of Queensland](http://espace.library.uq.edu.au/), part free.
    
    [Project Gutenberg](http://www.gutenberg.org/wiki/Main_Page), the greatest one, no more explianation.
    
    [The New Zealand Digital Library](http://www.nzdl.org/), free reading online.
    
    [Cornell University Library](http://arxiv.org/), free downloading in PDF.
    
    [Bartleby](http://www.bartleby.com/)
    
    [bibliomania](http://www.bibliomania.com/)
    
    [Elfwood](http://www.elfwood.com/)
    
-   ## [如何用版本工具维护翻译项目](https://mikespook.com/2015/01/how-to-maintain-a-translation-project-with-vcs/)
    
    个人来说，一直希望能将《[Go指南](http://go-tour-zh.appsp0t.com/ "Go指南")》这个项目的版本管理从 [bitbucket](https://mikespook.com/category/study-research/bitbucket.org/mikespook/go-tour-zh "go-tour-zh") 迁移到 github。但是由于上游英文源项目仍然在用 hg 作为版本管理工具所以一直也没有这么做。前几天 OlingCat 找我，希望将这个翻译项目放在 github 上的 [go-zh](https://github.com/go-zh/ "go-zh") 项目中。我当然欣然同意，虽然翻译工作还得用 hg 维护，但是 git 上能够有个[镜像](https://github.com/Go-zh/tour "tour")也是不错的事情。
    
    （中间略过若干 hg –> git 的鸡零狗碎不说）
    
    在等待同步的时候，我简单阅读了一下“[Go 项目翻译规范](http://go-zh.github.io/docs/trans-spec.html "Go 项目翻译规范")”，发现一个让我觉得很不舒服的设定。
    
    [(more…)](https://mikespook.com/2015/01/how-to-maintain-a-translation-project-with-vcs/#more-2034)
    
-   ## [“小”数据的危害](https://mikespook.com/2014/12/%e5%b0%8f%e6%95%b0%e6%8d%ae%e7%9a%84%e5%8d%b1%e5%ae%b3/)
    
    就我个人来说，离开学校进入工作之后，就离“入侵”啊、“破解”啊、“黑客”啊越来越远了。年龄越来越大，明白的事情理应越来越多。理应明白那些在 sunnet 百无聊赖瞎扯蛋的日子是回不来啦！
    
    这两年业内的发展还真有点另人惊讶，不停的有新的数据泄漏，有新的重大安全漏洞，有新的安全事故发生，只是似乎从手法上来说并无新意。依然老三篇：0day + 社工 + 易入目标。但是想想也对，自古打劫的就是威胁、恐吓、讲道理。手中的武器怎么更替，这根基是不会动摇的。不过有这么多数据样本，不玩玩实在是对不起人民群众啊！
    
    一不留神，扯了很多的蛋出来。那么回到主题，这两天疑似 12306 又泄漏了数据了。我拿到的是一个有 131653 条记录的文本文件。原始编码是 GB18030。至于这个数据到底是 12306 还是其他抢票平台泄漏的这个无从追究（或者不必要追究了）。在这次事件中，我遇到的对于这份数据最常见的反应（不论是技术人员还是非技术人员）都颇为一致：我搜了，里面没我……。确实，相对 12306 那庞大的用户信息库来说（数据总量估计是这个样本数据的一万倍以上，但是即便就是这个总量距离我们概念上的大数据还是很小的），要在这个小样本数据中找到自己其实不并不容易。那么换句话说，我们是不是就可以认为，这个广为流传的样本的价值（危害）很小了呢？
    
    [(more…)](https://mikespook.com/2014/12/%e5%b0%8f%e6%95%b0%e6%8d%ae%e7%9a%84%e5%8d%b1%e5%ae%b3/#more-2012)
    
-   ## [\[翻译\]这根本不是 BASH 的 bug！](https://mikespook.com/2014/09/not-a-bash-bug/)
    
    在前几天看到 [CVE-2014-6277](https://en.wikipedia.org/wiki/Shellshock_\(software_bug\)) 这个 BASH 的 bug 的时候，我就觉得挺奇葩的：这这种明显是有意实现的功能怎么会存在这么大的安全隐患呢？我不是专门搞安全的，同时觉得，这个 bug 可能虽然影响广泛，但并不是什么很有技术含量的利用思路。所以我就把这个事情放下没去想它。然而，随之而来的国内国外的各种媒体宣传、安全专家的联名建议、茶余饭后的坊间畅谈……对于 BASH 的这个 bug 无人不认为是个大 bug。不少人为此还在幸灾乐祸……但是我却没从各种评论中找到我的问题的答案。
    
    但是，当我看到[这篇随笔](http://paste.lisp.org/display/143864)时，我不得不赞同作者的观点：这根本不是 BASH 的 bug！
    
    所以我将原文翻译至此，希望能够带来一些思考。
    
    也许我们今天看到的一个愚蠢的 bug，在历史上的某一天，是一个有意而为之的神奇特性。也许我们应该思考的不仅仅是这一刻的 bug 或者安全隐患本身，而是在软件项目这个极具工程和创作品双重特性的活动中，如何有效的保证某个特性不会变成 bug。所以什么规范了，文档了，可真得不是纸上谈兵！
    
    不过话说回来，无论如何，我仍然坚信：“Less is exponentially more!（大道至简）”少一点 Feature 或许就是少一点 Bug 呢？
    
    [![bug-vs-feature](https://mikespook.com/wp-content/uploads/2014/09/bug-vs-feature-300x225.gif)](https://mikespook.com/wp-content/uploads/2014/09/bug-vs-feature.gif)
    
    [(more…)](https://mikespook.com/2014/09/not-a-bash-bug/#more-1973)
    
-   ## [\[翻译\]面向工程师的分布式系统理论](https://mikespook.com/2014/08/%e7%bf%bb%e8%af%91%e9%9d%a2%e5%90%91%e5%b7%a5%e7%a8%8b%e5%b8%88%e7%9a%84%e5%88%86%e5%b8%83%e5%bc%8f%e7%b3%bb%e7%bb%9f%e7%90%86%e8%ae%ba/)
    
    如果一个工程师说起话来像 PhD. 走起路来像 PhD. 干起活來像 PhD. 那他是什么？  
    他是一个懂理论的工程师……
    
    原文[在此](http://the-paper-trail.org/blog/distributed-systems-theory-for-the-distributed-systems-engineer/ "Distributed System Theory for Distributed System Engineer")。  
    ————翻译分隔线————
    
    ## 面向工程师的分布式系统理论
    
    Gwen Shapira，系统工程师明星，现在是 Cloudera 的全职工程师，在 Twitter 上问了[一个问题](https://twitter.com/gwenshap/status/497203248332165121)，引发了我的思考。
    
    我以前可能这样回答“好吧，这里有 FLP 的论文，而这是 Paxor的论文，还有这是拜占庭将军的论文……”，并且我会列出一个长长的原材料的清单，如果你够快的话大概可以在六个月的时间里看一遍。但是，现在我觉得提供一大堆关于理论的论文对于学习分布式系统理论往往是错误的道路（除非你在读 PhD）。论文通常都很深奥，也很复杂，需要认真的学习，且便随着巨大成就的是丰富的经验，和相关的业务上下文。有什么是需要这样高等级的工程师专家的呢？
    
    不幸的是，与此同时，缺少一个好的能够通向这些汇总材料的“桥梁”，提炼并融汇分布式系统理论中重要的结论和思路；而一些进行这些总结的材料的难度又过大。在思考的时候，我又想到另外一个问题：
    
    分布式系统工程师应当学习什么样的分布式系统理论？
    
    就这个例子来说，应当是没这么恐怖的、简单一些的理论。因此，我试着整理了一份我作为分布式系统工程师，每天的工作会应用到的一些基本概念的清单。我觉得这个清单应该足够支持分布式系统工程师设计新的系统。如果我漏掉了什么，务必告诉我！  
    [(more…)](https://mikespook.com/2014/08/%e7%bf%bb%e8%af%91%e9%9d%a2%e5%90%91%e5%b7%a5%e7%a8%8b%e5%b8%88%e7%9a%84%e5%88%86%e5%b8%83%e5%bc%8f%e7%b3%bb%e7%bb%9f%e7%90%86%e8%ae%ba/#more-1911)
