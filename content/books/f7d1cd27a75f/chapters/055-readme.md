实现Instagram的Material Design概念设计
---

>
* 原文链接:[Instagram with Material Design concept is getting real ](http://frogermcs.github.io/Instagram-with-Material-Design-concept-is-getting-real/)
* 译者 :  [jianghejie](https://github.com/jianghejie) 
* 译者博文链接 :  [jcodecraeer.com](http://jcodecraeer.com/a/anzhuokaifa/androidkaifa/2015/0204/2415.html)
 
几个月前（这篇文章的日期是2014 年11月10日），google发布了app和web应用的Material Design设计准则之后，设计师Emmanuel Pacamalan在youtube上发布了一则概念视频，演示了Instagram如果做成Material风格会是什么样子：

视频地址在这里 [http://v.youku.com/v_show/id_XODg2NDQ1NDQ4.html](http://v.youku.com/v_show/id_XODg2NDQ1NDQ4.html) ps:markdown不支持播放优酷视频

这 仅仅是停留在图像上的设计，是美好的愿景，估计很多人都会问，能否使用相对简单的办法将它实现出来呢？答案是：yes，不仅仅能实现，而且无须要求在 Lillipop版本，实际上几年前4.0发布之后我们就可以实现这些效果了。ps 读到这里我们应该反思这几年开发者是不是都吃屎去了。

鉴于这个原因，我决定开始撰写一个新的课题-如何将[INSTAGRAM with Material Design](https://www.youtube.com/watch?v=ojwdmgmdR_Q) 视频中的效果转变成现实。当然，我们并不是真的要做一个Instagram应用，只是将界面做出来而已，并且尽量减少一些不必要的细节。
##开始

本文将要实现的是视频中前7秒钟的效果。我觉得对于第一次尝试来说已经足够了。我想要提醒诸位的是，里面的实现方法不仅仅是能实现，也是我个人最喜欢的实现方式。还有，我不是一个美工，因此项目中的所有图片是直接从网上公开的渠道获取的。（主要是从   [resources page](http://www.google.com/design/spec/resources/sticker-sheets-icons.html) ）。

好了，下面是最终效果的两组截图和视频（很短的视频，就是那7秒钟的效果，可以在上面的视频中看到，这里因为没法直接引用youtube的视频就略了）（分别从Android 4 和5上获得的）：

![](http://jcodecraeer.com/uploads/20150204/1423058817102389.png)

![](http://jcodecraeer.com/uploads/20150204/1423059082492283.png)


##准备
在我们的项目中，将使用一些热门的android开发工具和库。并不是所有这些东西本篇文章都会用到，我只是将它们准备好以备不时之需。
初始化项目

首先我们需要创建一个新的android项目。我使用的是Android Studio和gradle的build方式。最低版本的sdk是15（即Android 4.0.4）。然后我们将添加一些依赖。没什么好讲的，下面是build.gradle以及app/build.gradle文件的代码：

build.gradle
```gradle
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:0.14.0'
        classpath 'com.jakewharton.hugo:hugo-plugin:1.1.+'
    }
}
  
allprojects {
    repositories {
        jcenter()
    }
}
```
app/build.gradle
```gradle
apply plugin: 'com.android.application'
apply plugin: 'hugo'
  
android {
    compileSdkVersion 21
    buildToolsVersion "21.1"
      
    defaultConfig {
        applicationId "io.github.froger.instamaterial"
        minSdkVersion 15
        targetSdkVersion 21
        versionCode 1
        versionName "1.0"
    }
}
  
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
      
    compile "com.android.support:appcompat-v7:21.0.0"
    compile 'com.android.support:support-v13:21.+'
    compile 'com.android.support:support-v4:21.+'
    compile 'com.android.support:palette-v7:+'
    compile 'com.android.support:recyclerview-v7:+'
    compile 'com.android.support:cardview-v7:21.0.+'
    compile 'com.jakewharton:butterknife:5.1.2'
    compile 'com.jakewharton.timber:timber:2.5.0'
    compile 'com.facebook.rebound:rebound:0.3.6'
}
```

简而言之，我们有如下工具：

一些兼容包（CardView, RecyclerView, Palette, AppCompat）-我喜欢使用最新的控件。当然你完全可以使用ListView Actionbar甚至View/FrameView来替代，但是为什么要这么折腾？😉

[ButterKnife](http://jakewharton.github.io/butterknife/) - view注入工具简化我们的代码。（比方说不再需要写findViewById()来引用view，以及一些更强大的功能）。

[Rebound](http://facebook.github.io/rebound/)  - 我们目前还没有用到，但是我以后肯定会用它。这个facebook开发的动画库可以让你的动画效果看起来更自然。

[Timber](https://github.com/JakeWharton/timber)  和 [Hugo](https://github.com/JakeWharton/hugo)   - 对这个项目而言并不是必须，我仅仅是用他们打印log。

##图片资源

本项目中将使用到一些Material Design的图标资源。App 图标来自于 [NSTAGRAM with Material Design](https://www.youtube.com/watch?v=ojwdmgmdR_Q) 视频，[这里](https://github.com/frogermcs/frogermcs.github.io/raw/master/files/2/resources.zip)  是项目的全套资源。
##样式

我们从定义app的默认样式开始。同时为Android 4和5定义Material Desing样式的最简单的方式是直接继承Theme.AppCompat.NoActionBar 或者 Theme.AppCompat.Light.NoActionBar主题。为什么是NoActionBar？因为新的sdk中为我们提供了实现Actionbar功能的新模式。本例中我们将使用Toolbar控件，基于这个原因-Toolbar是ActionBar更好更灵活的解决方案。我们不会深入讲解这个问题，但你可以去阅读android开发者博客[AppCompat v21](http://android-developers.blogspot.com/2014/10/appcompat-v21-material-design-for-pre.html)  。


根据概念视频中的效果，我们在AppTheme中定义了三个基本颜色（基色调）：

styles.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- styles.xml-->
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <item name="colorPrimary">@color/style_color_primary</item>
        <item name="colorPrimaryDark">@color/style_color_primary_dark</item>
        <item name="colorAccent">@color/style_color_accent</item>
    </style>
</resources>
```
colors1.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--colors.xml-->
<resources>
    <color name="style_color_primary">#2d5d82</color>
    <color name="style_color_primary_dark">#21425d</color>
    <color name="style_color_accent">#01bcd5</color>
</resources>
```
关于这三个颜色的意义，你可以在这里找到Material [Theme Color Palette documentation](http://developer.android.com/training/material/theme.html#ColorPalette) 。 
##布局
项目目前主要使用了3个主要的布局元素

    *Toolbar* - 包含导航图标和applogo的顶部bar

    *TRecyclerView*T - 用于显示feed

    *TFloating Action Button* - 一个实现了Material Design中[action button pattern](http://www.google.com/design/spec/components/buttons.html#buttons-flat-raised-buttons)的ImageButton。

在开始实现布局之前，我们先在res/values/dimens.xml文件中定义一些默认值：
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--dimens.xml-->
<resources>
    <dimen name="btn_fab_size">56dp</dimen>
    <dimen name="btn_fab_margins">16dp</dimen>
    <dimen name="default_elevation">8dp</dimen>
</resources>
```
这些值的大小是基于Material Design设计准则中的介绍。

现在我们来实现MainActivity中的layout：

activity_main.xml
```xml
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/root"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">
  
    <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        android:background="?attr/colorPrimary">
      
        <ImageView
            android:id="@+id/ivLogo"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_gravity="center"
            android:scaleType="center"
            android:src="https://raw.githubusercontent.com/bboyfeiyu/android-tech-frontier/HEAD/others/InstaMaterial概念设计系列/实现Instagram的Material Design概念设计/@drawable/img_toolbar_logo" />
    </android.support.v7.widget.Toolbar>
      
    <android.support.v7.widget.RecyclerView
        android:id="@+id/rvFeed"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/toolbar"
        android:scrollbars="none" />
      
    <ImageButton
        android:id="@+id/btnCreate"
        android:layout_width="@dimen/btn_fab_size"
        android:layout_height="@dimen/btn_fab_size"
        android:layout_alignParentBottom="true"
        android:layout_alignParentRight="true"
        android:layout_marginBottom="@dimen/btn_fab_margins"
        android:layout_marginRight="@dimen/btn_fab_margins"
        android:background="@drawable/btn_fab_default"
        android:elevation="@dimen/default_elevation"
        android:src="https://raw.githubusercontent.com/bboyfeiyu/android-tech-frontier/HEAD/others/InstaMaterial概念设计系列/实现Instagram的Material Design概念设计/@drawable/ic_instagram_white"
        android:textSize="28sp" />
  
</RelativeLayout>
```
以上代码的解释:

    关于Toolbar最重要的特征是他现在是activity layout的一部分，而且继承自ViewGroup，因此我们可以在里面放一些UI元素（它们将利用剩余空间）。本例中，它被用来放置logo图片。同时，因为Toolbar是比Actionbar更灵活的控件，我们可以自定义更多的东西，比如设置背景颜色为colorPrimary（否则Toolbar将是透明的）。

    RecyclerView虽然在xml中用起来非常简单，但是如果java代码中没有设置正确，app是不能启动的，会报java.lang.NullPointerException。


    Elevation（ImageButton中）属性不兼容api21以前的版本。所以如果我们想做到Floating Action Button的效果需要在Lollipop和Lollipop之前的设备上使用不同的background。

*Floating Action Button*

为了简化FAB的使用，我们将用对Lollipop以及Lollipop之前的设备使用不同的样式：

*FAB for Android v21:*

![](http://jcodecraeer.com/uploads/20150204/1423059083822681.png)

*FAB for Android pre-21:*

![](http://jcodecraeer.com/uploads/20150204/1423059084110006.png)

我们需要创建两个不同的xml文件来设置button的background：/res/drawable-v21/btn_fab_default.xml（Lollipop设备） ，/res/drawable/btn_fab_default.xml（Lollipop之前的设备）：

btn_fab_default2.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--drawable-v21/btn_fab_default.xml-->
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@color/fab_color_shadow">
    <item>
    <shape android:shape="oval">
    <solid android:color="@color/style_color_accent" />
    </shape>
    </item>
</ripple>
```
btn_fab_default1.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--drawable/btn_fab_default.xml-->
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_pressed="false">
        <layer-list>
            <item android:bottom="0dp" android:left="2dp" android:right="2dp" android:top="2dp">
                <shape android:shape="oval">
                    <solid android:color="@color/fab_color_shadow" />
                </shape>
            </item>
              
            <item android:bottom="2dp" android:left="2dp" android:right="2dp" android:top="2dp">
                <shape android:shape="oval">
                    <solid android:color="@color/style_color_accent" />
                </shape>
            </item>
        </layer-list>
    </item>
    <item android:state_pressed="true">
        <shape android:bottom="2dp" android:left="2dp" android:right="2dp" android:shape="oval" android:top="2dp">
        <solid android:color="@color/fab_color_pressed" />
        </shape>
    </item>
</selector>
```
上面的代码涉及到两个颜色的定义,在res/values/colors.xml中添加：
```xml
<color name="btn_default_light_normal">#00000000</color>
<color name="btn_default_light_pressed">#40ffffff</color>
```
可以看到在 21之前的设备商制造阴影比较复杂。不幸的是在xml中达到真实的阴影效果没有渐变方法。其他的办法是使用图片的方式，或者通过java代码实现（参见[creating fab shadow](http://stackoverflow.com/questions/24480425/android-l-fab-button-shadow)）。
##Toolbar

现在我们来完成Toolbar。我们已经有了background和应用的logo，现在还剩下navigation以及menu菜单图标了。关于navigation，非常不幸的是，在xml中app:navigationIcon=""是不起作用的，而android:navigationIcon=""又只能在Lollipop上有用，所以只能使用代码的方式了：
```xml
toolbar.setNavigationIcon(R.drawable.ic_menu_white);
```
注：app:navigationIcon=""的意思是使用兼容包appcompat的属性，而android:navigationIcon=""是标准的sdk属性。

至于menu图标我们使用标准的定义方式就好了：

在res/menu/menu_main.xml中
```xml
<!--menu_main.xml-->
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context=".MainActivity">
        <item
            android:id="@+id/action_inbox"
            android:icon="@drawable/ic_inbox_white"
            android:title="Inbox"
            app:showAsAction="always" />
</menu>
```
在activity中inflated这个menu：
```java
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu_main, menu);
    return true;
}
```
本应运行的很好，但是正如我在twitter上提到的，Toolbar onClick  selectors有不协调的情况：


为了解决这个问题，需要做更多的工作，首先为menu item创建一个自定义的view

res/layout/menu_item_view.xml：
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--menu_item_view.xml-->
<ImageButton xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="?attr/actionBarSize"
    android:layout_height="?attr/actionBarSize"
    android:background="@drawable/btn_default_light"
    android:src="https://raw.githubusercontent.com/bboyfeiyu/android-tech-frontier/HEAD/others/InstaMaterial概念设计系列/实现Instagram的Material Design概念设计/@drawable/ic_inbox_white" />
```
然后为Lollipop和Lollipop之前的设备分别创建onClick的selector，在Lollipop上有ripple效果：
btn_default_light2.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--drawable-v21/btn_default_light.xml-->
<ripple xmlns:android="http://schemas.android.com/apk/res/android"
    android:color="@color/btn_default_light_pressed" />
```
btn_default_light1.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--drawable/btn_default_light.xml-->
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/btn_default_light_normal" android:state_focused="false" android:state_pressed="false" />
    <item android:drawable="@color/btn_default_light_pressed" android:state_pressed="true" />
    <item android:drawable="@color/btn_default_light_pressed" android:state_focused="true" />
</selector>
```
现在，工程中的所有的color应该是这样子了：

colors.xml   
```xml
<?xml version="1.0" encoding="utf-8"?>
<!--colors.xml-->
<resources>
<color name="style_color_primary">#2d5d82</color>
<color name="style_color_primary_dark">#21425d</color>
<color name="style_color_accent">#01bcd5</color>
  
<color name="fab_color_pressed">#007787</color>
<color name="fab_color_shadow">#44000000</color>
  
<color name="btn_default_light_normal">#00000000</color>
<color name="btn_default_light_pressed">#40ffffff</color>
</resources>
```
 最后我们应该将custom view放到menu item中，在onCreateOptionsMenu()中：
```java
 @Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu_main, menu);
    inboxMenuItem = menu.findItem(R.id.action_inbox);
    inboxMenuItem.setActionView(R.layout.menu_item_view);
    return true;
}
```
以上就是toolbar的所有东西。并且onClick的按下效果也达到了预期的效果：

![](http://jcodecraeer.com/uploads/20150204/1423059085109860.png)

#Feed
最后需要实现的是feed，基于RecyclerView实现。我们需要设置两个东西：layout manager和adapter，因为这里其实就是想实现ListView的效果，所以直接用LinearLayoutManager就行了，而adapter我们首先从item的布局开始(res/layout/item_feed.xml)：

item_feed.xml

```xml
<?xml version="1.0" encoding="utf-8"?><!-- item_feed.xml -->
<android.support.v7.widget.CardView xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:card_view="http://schemas.android.com/apk/res-auto"
    android:id="@+id/card_view"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="center"
    android:layout_margin="8dp"
    card_view:cardCornerRadius="4dp">
  
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">
      
        <ImageView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:src="https://raw.githubusercontent.com/bboyfeiyu/android-tech-frontier/HEAD/others/InstaMaterial概念设计系列/实现Instagram的Material Design概念设计/@drawable/ic_feed_top" />
          
        <io.github.froger.instamaterial.SquaredImageView
            android:id="@+id/ivFeedCenter"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
          
        <ImageView
            android:id="@+id/ivFeedBottom"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />
      
    </LinearLayout>
</android.support.v7.widget.CardView>
```
FeedAdapter也非常简单：

FeedAdapter.java
```java
public class FeedAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final int ANIMATED_ITEMS_COUNT = 2;
      
    private Context context;
    private int lastAnimatedPosition = -1;
    private int itemsCount = 0;
      
    public FeedAdapter(Context context) {
        this.context = context;
    }
      
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        final View view = LayoutInflater.from(context).inflate(R.layout.item_feed, parent, false);
        return new CellFeedViewHolder(view);
    }
      
    private void runEnterAnimation(View view, int position) {
        if (position >= ANIMATED_ITEMS_COUNT - 1) {
            return;
        }
          
        if (position > lastAnimatedPosition) {
            lastAnimatedPosition = position;
            view.setTranslationY(Utils.getScreenHeight(context));
            view.animate()
            .translationY(0)
            .setInterpolator(new DecelerateInterpolator(3.f))
            .setDuration(700)
            .start();
        }
    }
      
    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder viewHolder, int position) {
        runEnterAnimation(viewHolder.itemView, position);
        CellFeedViewHolder holder = (CellFeedViewHolder) viewHolder;
        if (position % 2 == 0) {
            holder.ivFeedCenter.setImageResource(R.drawable.img_feed_center_1);
            holder.ivFeedBottom.setImageResource(R.drawable.img_feed_bottom_1);
        } else {
            holder.ivFeedCenter.setImageResource(R.drawable.img_feed_center_2);
            holder.ivFeedBottom.setImageResource(R.drawable.img_feed_bottom_2);
        }
    }
      
    @Override
    public int getItemCount() {
        return itemsCount;
    }
      
    public static class CellFeedViewHolder extends RecyclerView.ViewHolder {
        @InjectView(R.id.ivFeedCenter)
        SquaredImageView ivFeedCenter;
        @InjectView(R.id.ivFeedBottom)
        ImageView ivFeedBottom;
          
        public CellFeedViewHolder(View view) {
        super(view);
            ButterKnife.inject(this, view);
        }
    }
      
    public void updateItems() {
        itemsCount = 10;
        notifyDataSetChanged();
    }
}
```
没什么特别之处需要说明。

通过以下方法将他们放在一起：
```java
private void setupFeed() {
    LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
    rvFeed.setLayoutManager(linearLayoutManager);
    feedAdapter = new FeedAdapter(this);
    rvFeed.setAdapter(feedAdapter);
}
```
下面是整个MainActivity class的源码：
//MainActivity.java
```java
public class MainActivity extends ActionBarActivity {
    @InjectView(R.id.toolbar)
    Toolbar toolbar;
    @InjectView(R.id.rvFeed)
    RecyclerView rvFeed;
      
    private MenuItem inboxMenuItem;
    private FeedAdapter feedAdapter;
      
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ButterKnife.inject(this);
          
        setupToolbar();
        setupFeed();
    }
      
    private void setupToolbar() {
        setSupportActionBar(toolbar);
        toolbar.setNavigationIcon(R.drawable.ic_menu_white);
    }
      
    private void setupFeed() {
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        rvFeed.setLayoutManager(linearLayoutManager);
        feedAdapter = new FeedAdapter(this);
        rvFeed.setAdapter(feedAdapter);
    }
      
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);
        inboxMenuItem = menu.findItem(R.id.action_inbox);
        inboxMenuItem.setActionView(R.layout.menu_item_view);
        return true;
    }
}

```
运行结果：

Android Lollipop

![](http://jcodecraeer.com/uploads/20150204/1423059086107717.png)


Android pre-21

![](http://jcodecraeer.com/uploads/20150204/1423059082492283.png)

##动画

最后一件也是最重要的事情就是进入时的动画效果，再浏览一遍概念视频，可以发现在main Activity启动的时候有如下动画，分成两步：


显示Toolbar以及其里面的元素

在Toolbar动画完成之后显示feed和floating action button。

Toolbar中元素的动画表现为在较短的时间内一个接一个的进入。实现这个效果的主要问题在于navigation icon的动画，navigation icon是唯一一个不能使用动画的，其他的都好办。
*Toolbar animation*

首先我们只是需要在activity启动的时候才播放动画（在旋转屏幕的时候不播放），还要知道menu的动画过程是不能在onCreate()中去实现的（我们在onCreateOptionsMenu()中实现），创建一个布尔类型的变量pendingIntroAnimation ，在onCreate()方法中初始化：
```java
//...
if (savedInstanceState == null) {
    pendingIntroAnimation = true;
}
```
onCreateOptionsMenu():
```java
@Override
public boolean onCreateOptionsMenu(Menu menu) {
    getMenuInflater().inflate(R.menu.menu_main, menu);
    inboxMenuItem = menu.findItem(R.id.action_inbox);
    inboxMenuItem.setActionView(R.layout.menu_item_view);
    if (pendingIntroAnimation) {
        pendingIntroAnimation = false;
        startIntroAnimation();
    }
    return true;
}
```
这样startIntroAnimation()将只被调用一次。

现在该来准备Toolbar中元素的动画了，也非常简单

ToolbarAnimation
```java
//...
private static final int ANIM_DURATION_TOOLBAR = 300;
  
private void startIntroAnimation() {
    btnCreate.setTranslationY(2 * getResources().getDimensionPixelOffset(R.dimen.btn_fab_size));
    int actionbarSize = Utils.dpToPx(56);
    toolbar.setTranslationY(-actionbarSize);
    ivLogo.setTranslationY(-actionbarSize);
    inboxMenuItem.getActionView().setTranslationY(-actionbarSize);
      
    toolbar.animate()
        .translationY(0)
        .setDuration(ANIM_DURATION_TOOLBAR)
        .setStartDelay(300);
    ivLogo.animate()
        .translationY(0)
        .setDuration(ANIM_DURATION_TOOLBAR)
        .setStartDelay(400);
    inboxMenuItem.getActionView().animate()
        .translationY(0)
        .setDuration(ANIM_DURATION_TOOLBAR)
        .setStartDelay(500)
        .setListener(new AnimatorListenerAdapter() {
            @Override
            public void onAnimationEnd(Animator animation) {
            startContentAnimation();
            }
        })
        .start();
}
//...
```
在上面的代码中：

    首先我们将所有的元素都通过移动到屏幕之外隐藏起来（这一步我们将FAB也隐藏了）。

    让Toolbar元素一个接一个的开始动画

    当动画完成，调用了startContentAnimation()开始content的动画（FAB和feed卡片的动画）

 简单，是吧？
*Content 动画*

在这一步中我们将让FAB和feed卡片动起来。FAB的动画很简单，跟上面的方法类似，但是feed卡片稍微复杂些。

startContentAnimation方法
```java
//...
//FAB animation
private static final int ANIM_DURATION_FAB = 400;
  
private void startContentAnimation() {
    btnCreate.animate()
        .translationY(0)
        .setInterpolator(new OvershootInterpolator(1.f))
        .setStartDelay(300)
        .setDuration(ANIM_DURATION_FAB)
        .start();
    feedAdapter.updateItems();
}
//...
```
FeedAdapter的代码在上面已经贴出来了。结合着就知道动画是如何实现的了。


本篇文章就结束了，避免遗漏，这里是这篇文章是提交的代码 [commit for our project with implemented animations](https://github.com/frogermcs/InstaMaterial/commit/4e838861c5f858711b1072777cae2325ce12ee21) .

 
##源代码

完整的代码在[Github repository](https://github.com/frogermcs/InstaMaterial).

作者: Miroslaw Stanek
