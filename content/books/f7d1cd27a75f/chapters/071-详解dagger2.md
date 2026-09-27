���Dagger2
---

> * ԭ������ : [Tasting Dagger 2 on Android](http://fernandocejas.com/2015/04/11/tasting-dagger-2-on-android/)
* ԭ������ : [Fernando Cejas](http://fernandocejas.com/)
* [���ĳ��� :  ��������ǰ�� www.devtf.cn](http://www.devtf.cn)
* ���� : [xianjiajun](https://github.com/xianjiajun) 
* У����: [chaossss](https://github.com/chaossss)  
* ״̬ :  ���

##Ϊʲôʹ������ע��
����������Ҫ֪���������ںܳ���һ��ʱ���ﶼ�����ÿ��Ʒ�תԭ��涨��Ӧ�ó��������ȡ�����ڳ�������ʱ����ͼ�Ľ�����ͨ��������Ķ��󽻻�����ʵ�������Ķ�̬���̡���ʹ������ע�뼼�����߷���λ��������������ʱ�󶨡�

ʹ������ע����Դ������ºô���

* ������ע������ö��������֮�⡣
* ��Ϊ��������һ������������ϵĵط���ʼ�������Ե�ע����󷽷���ʱ������ֻ��Ҫ�޸Ķ����ʵ�ַ����������ô�Ĵ���⡣
* ��������ע�뵽һ������У����ǿ���ע����Щ������ģ��ʵ�֣�����ʹ�ò��Ը��Ӽ򵥡�

���Կ������ܹ���������ʵ���ķ�Χ��һ���ǳ��������顣���ҵĹ۵㣬��app�е����ж������Э���߶���Ӧ��֪���й�ʵ���������������ڵ��κ����飬��Щ��Ӧ�������ǵ�����ע���ܹ����ġ�

![p1](http://fernandocejas.com/wp-content/uploads/2015/04/dependency_inversion1.png)

#ʲô��JSR-330��
Ϊ�����̶ȵ���ߴ���ĸ����ԡ������Ժ�ά���ԣ�java������ע��Ϊע�����е�ʹ�ö�����һ����ע�⣨�ͽӿڣ���׼��Dagger1��Dagger2������Guice�����ǻ������ױ�׼��������������ȶ��Ժͱ�׼������ע�뷽����

#Dagger1
����汾������ƪ���µ��ص㣬������ֻ�Ǽ��Ե�˵һ�¡�����������Dagger1�������˺ܶ�Ĺ��ף�����˵�����Android�������е�����ע���ܡ�������Square��˾�ܵ�Guice���������ġ�

�����ص㣺

* ���ע��㣺������ͨ��injected
* ���ְ󶨷�����������ͨ��provided
* ���modules��ʵ��ĳ�ֹ��ܵİ󶨼���
* �������ͼ�� ʵ��һ����Χ��modules����

Dagger1���ڱ����ʱ��ʵ�а󶨣�����Ҳ�õ��˷�����ơ���������䲻������ʵ��������ģ���������ͼ�Ĺ��ɡ�Dagger�������е�ʱ��ȥ����Ƿ�һ�ж���������������ʹ�õ�ʱ��Ḷ��һЩ���ۣ�ż������Ч�͵������ѡ�

#Dagger2
Dagger2��Dagger1�ķ�֧���ɹȸ蹫˾���ֿ�����Ŀǰ�İ汾��2.0��Dagger2���ܵ�[AutoValue��Ŀ](https://github.com/google/auto)��������
�տ�ʼ��Dagger2�������Ļ���˼���ǣ��������ɺ�д�Ĵ����ϴﵽ�������еĲ������ṩ�����Ĵ��붼����д�����ӡ�

������ǽ�Dagger2��1�Ƚϣ����������ںܶ෽�涼�ǳ����ƣ���Ҳ�к���Ҫ���������£�

* ��Ҳû��ʹ�÷��䣺ͼ����֤�����ú�Ԥ�����ö��ڱ����ʱ��ִ�С�
* ���׵��ԺͿɸ��٣���ȫ����ص����ṩ�ʹ����Ķ�ջ
* ���õ����ܣ��ȸ��������������13%�Ĵ�������
* ���������ʹ����ǲ����������ͬ�Լ�д�Ĵ���һ��

��Ȼ������Щ�ܰ����ص㶼��Ҫ����һ�����ۣ��Ǿ���ȱ������ԣ����磺Dagger2û�÷�������û�ж�̬���ơ�

#�����о�
��Ҫ�˽�Dagger2���ͱ���Ҫ֪������ע��Ļ����������е�ÿһ�����

* @Inject: ͨ������Ҫ�����ĵط�ʹ�����ע�⡣���仰˵������������Dagger���������ֶ���Ҫ����ע�롣������Dagger�ͻṹ��һ��������ʵ�����������ǵ�������

* @Module: Modules������ķ���ר���ṩ�������������Ƕ���һ���࣬��@Moduleע�⣬����Dagger�ڹ������ʵ����ʱ�򣬾�֪��������ȥ�ҵ���Ҫ��������modules��һ����Ҫ�������������Ϊ�����������һ�𣨱���˵�������ǵ�app�п����ж�������һ���modules����

* @Provide: ��modules�У����Ƕ���ķ����������ע�⣬�Դ�������Dagger������Ҫ��������ṩ��Щ������

* @Component: Components�Ӹ�������˵����һ��ע������Ҳ����˵��@Inject��@Module��������������Ҫ���þ����������������֡�Components�����ṩ���ж����˵����͵�ʵ�������磺���Ǳ�����@Componentע��һ���ӿ�Ȼ���г����е�@Modules��ɸ���������ȱʧ���κ�һ�鶼���ڱ����ʱ�򱨴������е����������ͨ������modules֪�������ķ�Χ��

* @Scope: Scopes���Ƿǳ������ã�Dagger2����ͨ���Զ���ע���޶�ע�������򡣺������ʾһ�����ӣ�����һ���ǳ�ǿ����ص㣬��Ϊ����ǰ��˵��һ����û��Ҫ��ÿ������ȥ�˽���ι������ǵ�ʵ������scope�������У��������Զ����@PerActivityע��һ���࣬�������������ʱ��ͺ�activity��һ��������˵�������ǿ��Զ������з�Χ������(@PerFragment, @PerUser, �ȵ�)��

* Qualifier: ��������Ͳ����Լ���һ��������ʱ�����ǾͿ���ʹ�����ע���ʾ�����磺��Android�У����ǻ���Ҫ��ͬ���͵�context���������ǾͿ��Զ���qualifierע�⡰@ForApplication���͡�@ForActivity����������ע��һ��context��ʱ�����ǾͿ��Ը���Dagger������Ҫ�������͵�context��

#���ϻ��ϴ���
ǰ���Ѿ����˺ܶ������ˣ����Խ����������ǿ������ʹ��Dagger2�����Ȼ���Ҫ�����ǵ�build.gradle�ļ����������ã�
```java
apply plugin: 'com.neenbedankt.android-apt'
 
buildscript {
  repositories {
    jcenter()
  }
  dependencies {
    classpath 'com.neenbedankt.gradle.plugins:android-apt:1.4'
  }
}
 
android {
  ...
}
 
dependencies {
  apt 'com.google.dagger:dagger-compiler:2.0'
  compile 'com.google.dagger:dagger:2.0'
  
  ...
}
```

������ʾ�����������˱�������п⣬���бز����ٵ�apt�����û��������dagger���ܲ��������������ر�����Android studio�С�

#����
������ǰ����д��һƪ���������Android��ʵ��bob����������ܹ������£�ǿ�ҽ�����ȥ��һ�£�����֮���㽫��������������������и��õ����⡣�Թ�������������ǰ�ķ����У�������ṩ����������������ʱ�򣬻��������⣬�������£�����ע����
```java
  @Override void initializePresenter() {
    // All this dependency initialization could have been avoided by using a
    // dependency injection framework. But in this case this is used this way for
    // LEARNING EXAMPLE PURPOSE.
    ThreadExecutor threadExecutor = JobExecutor.getInstance();
    PostExecutionThread postExecutionThread = UIThread.getInstance();

    JsonSerializer userCacheSerializer = new JsonSerializer();
    UserCache userCache = UserCacheImpl.getInstance(getActivity(), userCacheSerializer,
        FileManager.getInstance(), threadExecutor);
    UserDataStoreFactory userDataStoreFactory =
        new UserDataStoreFactory(this.getContext(), userCache);
    UserEntityDataMapper userEntityDataMapper = new UserEntityDataMapper();
    UserRepository userRepository = UserDataRepository.getInstance(userDataStoreFactory,
        userEntityDataMapper);

    GetUserDetailsUseCase getUserDetailsUseCase = new GetUserDetailsUseCaseImpl(userRepository,
        threadExecutor, postExecutionThread);
    UserModelDataMapper userModelDataMapper = new UserModelDataMapper();

    this.userDetailsPresenter =
        new UserDetailsPresenter(this, getUserDetailsUseCase, userModelDataMapper);
  }
```

���Կ���������������İ취��ʹ������ע���ܡ�����Ҫ�����������������ô��룺����಻���漰����Ĵ������������ṩ��
�����Ǹ���ô���أ���Ȼ��ʹ��Dagger2�������ȿ����ṹͼ��
![pic2](http://fernandocejas.com/wp-content/uploads/2015/04/composed_dagger_graph1.png)

���������ǻ�ֽ�����ͼ�������͸������ֻ��д��롣

Application Component: �������ڸ�Applicationһ�����������ע�뵽AndroidApplication��BaseActivity�����С�

```java
@Singleton // Constraints this component to one-per-application or unscoped bindings.
@Component(modules = ApplicationModule.class)
public interface ApplicationComponent {
  void inject(BaseActivity baseActivity);

  //Exposed to sub-graphs.
  Context context();
  ThreadExecutor threadExecutor();
  PostExecutionThread postExecutionThread();
  UserRepository userRepository();
}
```

��Ϊ������ʹ����@Singletonע�⣬ʹ�䱣֤Ψһ�ԡ�Ҳ�������Ϊʲô��Ҫ��context��������Ա��¶��ȥ��������Dagger��components��������Ҫ���ʣ�����㲻���modules�����ͱ�¶��������ô���ֻ����ʾ��ʹ�����ǡ�����������У��Ұ���ЩԪ�ر�¶����ͼ������������ɾ���������ʱ��ͻᱨ����

Application Module: module���������ṩ��Ӧ�õ����������д��Ķ�����Ҳ��Ϊʲô@Provideע��ķ���Ҫ��@Singleton�޶���

```java
@Module
public class ApplicationModule {
  private final AndroidApplication application;

  public ApplicationModule(AndroidApplication application) {
    this.application = application;
  }

  @Provides @Singleton Context provideApplicationContext() {
    return this.application;
  }

  @Provides @Singleton Navigator provideNavigator() {
    return new Navigator();
  }

  @Provides @Singleton ThreadExecutor provideThreadExecutor(JobExecutor jobExecutor) {
    return jobExecutor;
  }

  @Provides @Singleton PostExecutionThread providePostExecutionThread(UIThread uiThread) {
    return uiThread;
  }

  @Provides @Singleton UserCache provideUserCache(UserCacheImpl userCache) {
    return userCache;
  }

  @Provides @Singleton UserRepository provideUserRepository(UserDataRepository userDataRepository) {
    return userDataRepository;
  }
}
```

Activity Component: �������ڸ�Activityһ���������

```java
@PerActivity
@Component(dependencies = ApplicationComponent.class, modules = ActivityModule.class)
public interface ActivityComponent {
  //Exposed to sub-graphs.
  Activity activity();
}
```

@PerActivity��һ���Զ���ķ�Χע�⣬�������������󱻼�¼����ȷ������У���Ȼ��Щ�������������Ӧ����ѭactivity���������ڡ�����һ���ܺõ���ϰ���ҽ������Ƕ���һ�£������ºô���

* ע����󵽹��췽����Ҫ��activity��
* ��һ��per-activity�����ϵĵ���ʹ�á�
* ֻ����activity��ʹ��ʹ��ȫ�ֵĶ���ͼ����������

���´��룺
```java
@Scope
@Retention(RUNTIME)
public @interface PerActivity {}
```

Activity Module: �ڶ���ͼ�У����module��activity��¶����������ࡣ������fragment��ʹ��activity��context��

```java
@Module
public class ActivityModule {
  private final Activity activity;

  public ActivityModule(Activity activity) {
    this.activity = activity;
  }

  @Provides @PerActivity Activity activity() {
    return this.activity;
  }
}
```
User Component: �̳���ActivityComponent�����������@PerActivityע�⡣��ͨ������ע���û���ص�fragment��ʹ�á���ΪActivityModule��activity��¶��ͼ�ˣ��������κ���Ҫһ��activity��context��ʱ��Dagger�������ṩע�룬û��Ҫ������modules�ж����ˡ�

```java
@PerActivity
@Component(dependencies = ApplicationComponent.class, modules = {ActivityModule.class, UserModule.class})
public interface UserComponent extends ActivityComponent {
  void inject(UserListFragment userListFragment);
  void inject(UserDetailsFragment userDetailsFragment);
}
```
User Module: �ṩ���û���ص�ʵ�����������ǵ����ӣ��������ṩ�û�������

```java
@Module
public class UserModule {
  @Provides @PerActivity GetUserListUseCase provideGetUserListUseCase(GetUserListUseCaseImpl getUserListUseCase) {
    return getUserListUseCase;
  }

  @Provides @PerActivity GetUserDetailsUseCase provideGetUserDetailsUseCase(GetUserDetailsUseCaseImpl getUserDetailsUseCase) {
    return getUserDetailsUseCase;
  }
}
```
#���ϵ�һ��
���������Ѿ�ʵ��������ע��ͼ�������Ҹ����ע�룿������Ҫ֪����Dagger��������һ��ѡ������ע��������

 1. ���췽��ע�룺����Ĺ��췽��ǰ��ע��@Inject
 2. ��Ա����ע�룺����ĳ�Ա��������˽�У�ǰ��ע��@Inject
 3. ��������ע�룺�ں���ǰ��ע��@Inject

���˳����Dagger����ʹ�õģ���Ϊ�����еĹ����У��ܻ���һЩ��ֵ����������ǿ�ָ�룬��Ҳ��ζ����������ڶ��󴴽���ʱ����ܻ�û�г�ʼ����ɡ�����Android��activity����fragment��ʹ�ó�Ա����ע��ᾭ����������Ϊ����û�������ǵĹ��췽����ʹ�á�

�ص����ǵ������У���һ�������������BaseActivity��ע��һ����Ա����������������У�����ע����һ����Navigator���࣬��������Ӧ���и�������������ࡣ

```java
public abstract class BaseActivity extends Activity {

  @Inject Navigator navigator;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.getApplicationComponent().inject(this);
  }

  protected ApplicationComponent getApplicationComponent() {
    return ((AndroidApplication)getApplication()).getApplicationComponent();
  }

  protected ActivityModule getActivityModule() {
    return new ActivityModule(this);
  }
}
```

Navigator���ǳ�Ա����ע��ģ���ApplicationModule����@Provideע����ʾ�ṩ�ġ��������ǳ�ʼ��componentȻ�����inject()����ע���Ա����������ͨ����Activity��onCreate()�����е���getApplicationComponent()�������Щ������getApplicationComponent()�������������Ϊ�˸����ԣ�������Ҫ������Ϊ�˻�ȡʵ������ApplicationComponent����

��Fragment��presenter������Ҳ����ͬ�������飬����Ļ�ȡ������һ�㲻һ������Ϊ������ʹ�õ���per-activity��Χ�޶���component����������ע�뵽UserDetailsFragment�е�UserComponent��ʵ��פ����UserDetailsActivity�еġ�

```java
private UserComponent userComponent;
```
���Ǳ�����activity��onCreate()������������ķ�ʽ��ʼ����
```java
private void initializeInjector() {
  this.userComponent = DaggerUserComponent.builder()
      .applicationComponent(getApplicationComponent())
      .activityModule(getActivityModule())
      .build();
}
```
Dagger�ᴦ�����ǵ�ע�⣬Ϊcomponents����ʵ�ֲ����������ϡ�Dagger��ǰ׺����Ϊ�����һ����ϵ�component�������ڹ�����ʱ�����Ǳ�������е������Ĵ���ȥ��components��modules�����������ǵ�component�Ѿ�׼�����ˣ�����Ϊ�˿�������fragment��������������дһ����ȡ������

```java
@Override public UserComponent getComponent() {
  return userComponent;
}
```
�������ڿ�������get������ȡ������component��Ȼ�����inject()������Fragment��Ϊ��������ȥ������������˰�UserDetailsFragment������

```java
@Override public void onActivityCreated(Bundle savedInstanceState) {
  super.onActivityCreated(savedInstanceState);
  this.getComponent.inject(this);
}
```
[��Ҫ�鿴���������ӣ�����ȥ�ҵ�github](https://github.com/android10/Android-CleanArchitecture).��������һЩ�ط��ع��˵ģ��ҿ��Ը�����һ����Ҫ��˼�루���Թٷ������ӣ��ǣ�

```java
public interface HasComponent<C> {
  C getComponent();
}
```
��ˣ��ͻ��ˣ�����fragment�����Ի�ȡ����ʹ��component������activity����
```java
@SuppressWarnings("unchecked")
protected <C> C getComponent(Class<C> componentType) {
  return componentType.cast(((HasComponent<C>)getActivity()).getComponent());
}
```
���ʹ����ǿ��ת������������ͻ��˲��ܻ�ȡ�����õ�component���������ٺܿ�ͻ�ʧ�ܡ���������κ��뷨�ܹ����õؽ��������⣬������ҡ�
#Dagger2���ɵĴ���
���˽�Dagger����Ҫ����֮���������������ڲ����졣Ϊ�˾���˵�������ǻ�����Navigator�࣬����������δ�����ע��ġ��������ǿ�һ�����ǵ�DaggerApplicationComponent��
```java
@Generated("dagger.internal.codegen.ComponentProcessor")
public final class DaggerApplicationComponent implements ApplicationComponent {
  private Provider<Navigator> provideNavigatorProvider;
  private MembersInjector<BaseActivity> baseActivityMembersInjector;

  private DaggerApplicationComponent(Builder builder) {  
    assert builder != null;
    initialize(builder);
  }

  public static Builder builder() {  
    return new Builder();
  }

  private void initialize(final Builder builder) {  
    this.provideNavigatorProvider = ScopedProvider.create(ApplicationModule_ProvideNavigatorFactory.create(builder.applicationModule));
    this.baseActivityMembersInjector = BaseActivity_MembersInjector.create((MembersInjector) MembersInjectors.noOp(), provideNavigatorProvider);
  }

  @Override
  public void inject(BaseActivity baseActivity) {  
    baseActivityMembersInjector.injectMembers(baseActivity);
  }

  public static final class Builder {
    private ApplicationModule applicationModule;
  
    private Builder() {  
    }
  
    public ApplicationComponent build() {  
      if (applicationModule == null) {
        throw new IllegalStateException("applicationModule must be set");
      }
      return new DaggerApplicationComponent(this);
    }
  
    public Builder applicationModule(ApplicationModule applicationModule) {  
      if (applicationModule == null) {
        throw new NullPointerException("applicationModule");
      }
      this.applicationModule = applicationModule;
      return this;
    }
  }
}
```
�������ص���Ҫע�⡣��һ������������Ҫ������ע�뵽activity�У����Ի�õ�һ��ע������ȳ�Ա��ע��������Dagger���ɵ�BaseActivity_MembersInjector����
```java
@Generated("dagger.internal.codegen.ComponentProcessor")
public final class BaseActivity_MembersInjector implements MembersInjector<BaseActivity> {
  private final MembersInjector<Activity> supertypeInjector;
  private final Provider<Navigator> navigatorProvider;

  public BaseActivity_MembersInjector(MembersInjector<Activity> supertypeInjector, Provider<Navigator> navigatorProvider) {  
    assert supertypeInjector != null;
    this.supertypeInjector = supertypeInjector;
    assert navigatorProvider != null;
    this.navigatorProvider = navigatorProvider;
  }

  @Override
  public void injectMembers(BaseActivity instance) {  
    if (instance == null) {
      throw new NullPointerException("Cannot inject members into a null reference");
    }
    supertypeInjector.injectMembers(instance);
    instance.navigator = navigatorProvider.get();
  }

  public static MembersInjector<BaseActivity> create(MembersInjector<Activity> supertypeInjector, Provider<Navigator> navigatorProvider) {  
      return new BaseActivity_MembersInjector(supertypeInjector, navigatorProvider);
  }
}
```
���ע����һ�㶼��Ϊ����activity��ע���Ա�ṩ������ֻҪ����һ����inject()�������Ϳ��Ի�ȡ��Ҫ���ֶκ�������

�ڶ����ص㣺�������ǵ�DaggerApplicationComponent�࣬������һ��Provider������������һ���ṩʵ���Ľӿڣ������Ǳ�ScopedProvider��������ģ����Լ�¼����ʵ���ķ�Χ��

Dagger����Ϊ���ǵ�Navigator������һ������ApplicationModule_ProvideNavigatorFactory�Ĺ���������������Դ��������ᵽ�ķ�Χ����Ȼ��õ������Χ�ڵ����ʵ����

```java
@Generated("dagger.internal.codegen.ComponentProcessor")
public final class ApplicationModule_ProvideNavigatorFactory implements Factory<Navigator> {
  private final ApplicationModule module;

  public ApplicationModule_ProvideNavigatorFactory(ApplicationModule module) {  
    assert module != null;
    this.module = module;
  }

  @Override
  public Navigator get() {  
    Navigator provided = module.provideNavigator();
    if (provided == null) {
      throw new NullPointerException("Cannot return null from a non-@Nullable @Provides method");
    }
    return provided;
  }

  public static Factory<Navigator> create(ApplicationModule module) {  
    return new ApplicationModule_ProvideNavigatorFactory(module);
  }
}
```

�����ǳ��򵥣����������ǵ�ApplicationModule������@Provide������������Navigator�ࡣ

��֮������Ĵ��뿴�������������ó����ģ����ҷǳ������⣬���ڵ��ԡ����໹�кܶ����ȥ̽�������ǿ���ͨ������ȥ����Dagger�����������󶨵ġ�
![pic3](http://fernandocejas.com/wp-content/uploads/2015/04/debugging_dagger.png)

#Դ��:
����: https://github.com/android10/Android-CleanArchitecture
#�������:
[Architecting Android��The clean way?](http://fernandocejas.com/2014/09/03/architecting-android-the-clean-way/)
[Dagger 2, A New Type of Dependency Injection.](https://www.youtube.com/watch?v=oK_XtfXPkqw)
[Dependency Injection with Dagger 2.](https://speakerdeck.com/jakewharton/dependency-injection-with-dagger-2-devoxx-2014)
[Dagger 2 has Components.](https://publicobject.com/2014/11/15/dagger-2-has-components/)
[Dagger 2 Official Documentation.](http://google.github.io/dagger/)
