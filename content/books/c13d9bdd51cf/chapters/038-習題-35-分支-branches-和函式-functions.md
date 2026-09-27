你已經學會了 `if` 語句、函式、還有陣列。現在你要練習扭轉一下思維了。把下面的代碼寫下來，看你是否能弄懂它實現的是什麼功能。

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
<span>3</span>
<span>4</span>
<span>5</span>
<span>6</span>
<span>7</span>
<span>8</span>
<span>9</span>
<span>10</span>
<span>11</span>
<span>12</span>
<span>13</span>
<span>14</span>
<span>15</span>
<span>16</span>
<span>17</span>
<span>18</span>
<span>19</span>
<span>20</span>
<span>21</span>
<span>22</span>
<span>23</span>
<span>24</span>
<span>25</span>
<span>26</span>
<span>27</span>
<span>28</span>
<span>29</span>
<span>30</span>
<span>31</span>
<span>32</span>
<span>33</span>
<span>34</span>
<span>35</span>
<span>36</span>
<span>37</span>
<span>38</span>
<span>39</span>
<span>40</span>
<span>41</span>
<span>42</span>
<span>43</span>
<span>44</span>
<span>45</span>
<span>46</span>
<span>47</span>
<span>48</span>
<span>49</span>
<span>50</span>
<span>51</span>
<span>52</span>
<span>53</span>
<span>54</span>
<span>55</span>
<span>56</span>
<span>57</span>
<span>58</span>
<span>59</span>
<span>60</span>
<span>61</span>
<span>62</span>
<span>63</span>
<span>64</span>
<span>65</span>
<span>66</span>
<span>67</span>
<span>68</span>
<span>69</span>
<span>70</span>
<span>71</span>
<span>72</span>
<span>73</span>
<span>74</span>
<span>75</span>
<span>76</span>
<span>77</span>
<span>78</span>
<span>79</span>
<span>80</span>
<span>81</span>
<span>82</span>
<span>83</span>
<span>84</span>
<span>85</span>
<span>86</span>
</pre></td><td><pre><code><span><span>def</span> <span>prompt</span><span>()</span>
</span><span>  <span>print</span> <span>"&gt; "</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>gold_room</span><span>()</span>
</span><span>  <span>puts</span> <span>"This room is full of gold.  How much do you take?"</span>
</span><span>
</span><span>  <span>prompt</span><span>;</span> <span>next_move</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span>
</span><span>  <span>if</span> <span>next_move</span><span>.</span><span>include?</span> <span>"0"</span> <span>or</span> <span>next_move</span><span>.</span><span>include?</span> <span>"1"</span>
</span><span>    <span>how_much</span> <span>=</span> <span>next_move</span><span>.</span><span>to_i</span><span>()</span>
</span><span>  <span>else</span>
</span><span>    <span>dead</span><span>(</span><span>"Man, learn to type a number."</span><span>)</span>
</span><span>  <span>end</span>
</span><span>
</span><span>  <span>if</span> <span>how_much</span> <span>&lt;</span> <span>50</span>
</span><span>    <span>puts</span> <span>"Nice, you're not greedy, you win!"</span>
</span><span>    <span>Process</span><span>.</span><span>exit</span><span>(</span><span>0</span><span>)</span>
</span><span>  <span>else</span>
</span><span>    <span>dead</span><span>(</span><span>"You greedy bastard!"</span><span>)</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span>
</span><span><span>def</span> <span>bear_room</span><span>()</span>
</span><span>  <span>puts</span> <span>"There is a bear here."</span>
</span><span>  <span>puts</span> <span>"The bear has a bunch of honey."</span>
</span><span>  <span>puts</span> <span>"The fat bear is in front of another door."</span>
</span><span>  <span>puts</span> <span>"How are you going to move the bear?"</span>
</span><span>  <span>bear_moved</span> <span>=</span> <span>false</span>
</span><span>
</span><span>  <span>while</span> <span>true</span>
</span><span>    <span>prompt</span><span>;</span> <span>next_move</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span>
</span><span>
</span><span>    <span>if</span> <span>next_move</span> <span>==</span> <span>"take honey"</span>
</span><span>      <span>dead</span><span>(</span><span>"The bear looks at you then slaps your face off."</span><span>)</span>
</span><span>    <span>elsif</span> <span>next_move</span> <span>==</span> <span>"taunt bear"</span> <span>and</span> <span>not</span> <span>bear_moved</span>
</span><span>      <span>puts</span> <span>"The bear has moved from the door. You can go through it now."</span>
</span><span>      <span>bear_moved</span> <span>=</span> <span>true</span>
</span><span>    <span>elsif</span> <span>next_move</span> <span>==</span> <span>"taunt bear"</span> <span>and</span> <span>bear_moved</span>
</span><span>      <span>dead</span><span>(</span><span>"The bear gets pissed off and chews your leg off."</span><span>)</span>
</span><span>    <span>elsif</span> <span>next_move</span> <span>==</span> <span>"open door"</span> <span>and</span> <span>bear_moved</span>
</span><span>      <span>gold_room</span><span>()</span>
</span><span>    <span>else</span>
</span><span>      <span>puts</span> <span>"I got no idea what that means."</span>
</span><span>    <span>end</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>cthulu_room</span><span>()</span>
</span><span>  <span>puts</span> <span>"Here you see the great evil Cthulu."</span>
</span><span>  <span>puts</span> <span>"He, it, whatever stares at you and you go insane."</span>
</span><span>  <span>puts</span> <span>"Do you flee for your life or eat your head?"</span>
</span><span>
</span><span>  <span>prompt</span><span>;</span> <span>next_move</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span>
</span><span>
</span><span>  <span>if</span> <span>next_move</span><span>.</span><span>include?</span> <span>"flee"</span>
</span><span>    <span>start</span><span>()</span>
</span><span>  <span>elsif</span> <span>next_move</span><span>.</span><span>include?</span> <span>"head"</span>
</span><span>    <span>dead</span><span>(</span><span>"Well that was tasty!"</span><span>)</span>
</span><span>  <span>else</span>
</span><span>    <span>cthulu_room</span><span>()</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>dead</span><span>(</span><span>why</span><span>)</span>
</span><span>  <span>puts</span> <span>"</span><span>#{</span><span>why</span><span>}</span><span>  Good job!"</span>
</span><span>  <span>Process</span><span>.</span><span>exit</span><span>(</span><span>0</span><span>)</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>start</span><span>()</span>
</span><span>  <span>puts</span> <span>"You are in a dark room."</span>
</span><span>  <span>puts</span> <span>"There is a door to your right and left."</span>
</span><span>  <span>puts</span> <span>"Which one do you take?"</span>
</span><span>
</span><span>  <span>prompt</span><span>;</span> <span>next_move</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span>
</span><span>
</span><span>  <span>if</span> <span>next_move</span> <span>==</span> <span>"left"</span>
</span><span>    <span>bear_room</span><span>()</span>
</span><span>  <span>elsif</span> <span>next_move</span> <span>==</span> <span>"right"</span>
</span><span>    <span>cthulu_room</span><span>()</span>
</span><span>  <span>else</span>
</span><span>    <span>dead</span><span>(</span><span>"You stumble around the room until you starve."</span><span>)</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>start</span><span>()</span>
</span></code></pre></td></tr></tbody></table>

## 你應該看到的結果

你可以結果：

```
$ ruby ex35.rb
You are in a dark room.
There is a door to your right and left.
Which one do you take?
> left
There is a bear here.
The bear has a bunch of honey.
The fat bear is in front of another door.
How are you going to move the bear?
> taunt bear
The bear has moved from the door. You can go through it now.
> open door
This room is full of gold.  How much do you take?
> asf
Man, learn to type a number. Good job!
$
```

## 加分習題

1.  把這個遊戲的地圖畫出來，把自己的路線也畫出來。
2.  改正你所有的錯誤，包括拼寫錯誤。
3.  為你不懂的函式寫註解。記得 **RDoc** 中的註釋嗎？
4.  為遊戲添加更多元素。通過怎樣的方式可以簡化並且擴充遊戲的功能呢？
5.  這個 gold\_room 遊戲使用了奇怪的方式讓你鍵入一個數字。這種方式會導致什麼樣的bug？你可以用比檢查 0、1更好的方式判斷輸入是否是數字嗎？ `to_i()` 這個函式可以給你一些頭緒。
