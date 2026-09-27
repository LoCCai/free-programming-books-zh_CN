你在上一節中發現 Hash 的秘密功能了嗎？你可以解釋給自己嗎？讓我來給你解釋一下，順便和你自己的理解對比看有什麼不同。這裡是我們要討論的程式碼：

<table><tbody><tr><td><pre><span>1</span>
<span>2</span>
</pre></td><td><pre><code><span><span>cities</span><span>[</span><span>:find</span><span>]</span> <span>=</span> <span>method</span><span>(</span><span>:find_city</span><span>)</span>
</span><span><span>puts</span> <span>cities</span><span>[</span><span>:find</span><span>].</span><span>call</span><span>(</span><span>cities</span><span>,</span> <span>state</span><span>)</span>
</span></code></pre></td></tr></tbody></table>

你要記住一個函式也可以作為一個變數，為了要將一個程式碼區段儲存在一個變數裡，我們創造了一個東西叫「proc」，proc 是 procedure 縮寫。在這段程式碼中，首先我們呼叫了 Ruby 內建的函式 `method`，它會回傳一個 proc 版的 `find_city` 函式。然後我們將之除存在一個 Hash 裡：key 是 `:find`，value 是 `cities`。。這和我們將州和市關聯起來的程式碼做的事情一樣，只不過在這個情況裡是個 proc。

好了，所以一旦我們知道 `find_city` 是在Hash中 `:find` 的位置，這就意味著我們可以去呼叫它。第二行程式碼可以分解成如下步驟：

1.  Ruby 讀到了 `cities`，然後知道了它是一個 「Hash」。
2.  然後看到了`[:find]`，於是 Ruby 就從索引找到了 cities Hash 中對應的位置，並且獲取了該位置的內容。
3.  `[:find]` 這個位置的內容是我們的函式 `find_city`，所以Ruby就知道了這裡表示一個函式，於是當它碰到`.call`就開始了 proc呼叫。
4.  `cities`、`state` 這兩個參數將被傳遞到函式 `find_city` 中，然後這個函式就被運行了。
5.  `find_city` 接著從 `cities` 中尋找 `states`，並且回傳它找到的內容，如果什麼都沒找到，就返回一個信息說它什麼都沒找到。
6.  Ruby 接受 `find_city` 傳回的資訊，最後將該資訊賦值給一開始的 `city_found` 這個變數。

我再教你一個小技巧。如果你倒著閱讀的話，程式碼可能會變得更容易理解。讓我們來試一下，一樣是那行：

1.  `state` 和 `city` 是…
2.  最為參數傳遞給…
3.  一個 proc 位於…
4.  `:find` 然後尋找，目的地為…
5.  `cities` 這個 Hash…
6.  最後印到螢幕上

還有一種方法讀它，這回是「由裡向外」。

1.  找到表示式的中心位置，此次為`[:find]`。
2.  逆時針追溯，首先看到的是一個叫 `cities`的 Hash，這樣就知道了 `cities` 中的 `:find` 元素。
3.  上一步得到一個函式。繼續逆時針尋找，看到的是參數。
4.  參數傳遞給函式後，函式會傳回一個值。然後再逆時針尋找。
5.  最後，我們到了`city_found` =的賦值位置，並且得到了最終結果。

數十年的程式經驗下來，我在讀程式碼的過程中已經用不到上面的三種方法了。我只要瞄一眼就能知道它的意思。甚至給我一整頁的程式碼，我也可以一眼瞄出裡邊的 bug 和錯誤。這樣的技能是花了超乎常人的時間和精力才鍛煉得來的。在磨練的過程中，我學會了下面三種讀程式碼的方法：

1.  從前向後。
2.  從後向前。
3.  逆時針方向。

現在我們來寫這次的練習，寫完後再過一遍，這節習題其實挺有趣的。

程式碼不少，不過還是從頭寫完吧。確認它能運行，然後玩一下看看。

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
<span>87</span>
<span>88</span>
<span>89</span>
<span>90</span>
<span>91</span>
<span>92</span>
<span>93</span>
<span>94</span>
<span>95</span>
<span>96</span>
<span>97</span>
<span>98</span>
<span>99</span>
<span>100</span>
<span>101</span>
<span>102</span>
<span>103</span>
<span>104</span>
<span>105</span>
<span>106</span>
<span>107</span>
<span>108</span>
<span>109</span>
<span>110</span>
<span>111</span>
<span>112</span>
<span>113</span>
<span>114</span>
<span>115</span>
<span>116</span>
<span>117</span>
<span>118</span>
<span>119</span>
<span>120</span>
<span>121</span>
<span>122</span>
<span>123</span>
<span>124</span>
<span>125</span>
<span>126</span>
<span>127</span>
<span>128</span>
<span>129</span>
<span>130</span>
<span>131</span>
<span>132</span>
<span>133</span>
<span>134</span>
<span>135</span>
<span>136</span>
<span>137</span>
<span>138</span>
<span>139</span>
<span>140</span>
<span>141</span>
<span>142</span>
<span>143</span>
<span>144</span>
<span>145</span>
<span>146</span>
<span>147</span>
<span>148</span>
<span>149</span>
<span>150</span>
<span>151</span>
<span>152</span>
<span>153</span>
<span>154</span>
<span>155</span>
<span>156</span>
<span>157</span>
<span>158</span>
<span>159</span>
<span>160</span>
<span>161</span>
<span>162</span>
<span>163</span>
<span>164</span>
<span>165</span>
<span>166</span>
<span>167</span>
<span>168</span>
<span>169</span>
<span>170</span>
<span>171</span>
<span>172</span>
<span>173</span>
<span>174</span>
<span>175</span>
<span>176</span>
<span>177</span>
<span>178</span>
<span>179</span>
<span>180</span>
</pre></td><td><pre><code><span><span>def</span> <span>prompt</span><span>()</span>
</span><span>  <span>print</span> <span>"&gt; "</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>death</span><span>()</span>
</span><span>  <span>quips</span> <span>=</span> <span>[</span><span>"You died.  You kinda suck at this."</span><span>,</span>
</span><span>    <span>"Nice job, you died ...jackass."</span><span>,</span>
</span><span>    <span>"Such a luser."</span><span>,</span>
</span><span>    <span>"I have a small puppy that's better at this."</span><span>]</span>
</span><span>  <span>puts</span> <span>quips</span><span>[</span><span>rand</span><span>(</span><span>quips</span><span>.</span><span>length</span><span>())</span><span>]</span>
</span><span>  <span>Process</span><span>.</span><span>exit</span><span>(</span><span>1</span><span>)</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>central_corridor</span><span>()</span>
</span><span>  <span>puts</span> <span>"The Gothons of Planet Percal #25 have invaded your ship and destroyed"</span>
</span><span>  <span>puts</span> <span>"your entire crew.  You are the last surviving member and your last"</span>
</span><span>  <span>puts</span> <span>"mission is to get the neutron destruct bomb from the Weapons Armory,"</span>
</span><span>  <span>puts</span> <span>"put it in the bridge, and blow the ship up after getting into an "</span>
</span><span>  <span>puts</span> <span>"escape pod."</span>
</span><span>  <span>puts</span> <span>"</span><span>\n</span><span>"</span>
</span><span>  <span>puts</span> <span>"You're running down the central corridor to the Weapons Armory when"</span>
</span><span>  <span>puts</span> <span>"a Gothon jumps out, red scaly skin, dark grimy teeth, and evil clown costume"</span>
</span><span>  <span>puts</span> <span>"flowing around his hate filled body.  He's blocking the door to the"</span>
</span><span>  <span>puts</span> <span>"Armory and about to pull a weapon to blast you."</span>
</span><span>
</span><span>  <span>prompt</span><span>()</span>
</span><span>  <span>action</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span><span>()</span>
</span><span>
</span><span>  <span>if</span> <span>action</span> <span>==</span> <span>"shoot!"</span>
</span><span>    <span>puts</span> <span>"Quick on the draw you yank out your blaster and fire it at the Gothon."</span>
</span><span>    <span>puts</span> <span>"His clown costume is flowing and moving around his body, which throws"</span>
</span><span>    <span>puts</span> <span>"off your aim.  Your laser hits his costume but misses him entirely.  This"</span>
</span><span>    <span>puts</span> <span>"completely ruins his brand new costume his mother bought him, which"</span>
</span><span>    <span>puts</span> <span>"makes him fly into an insane rage and blast you repeatedly in the face until"</span>
</span><span>    <span>puts</span> <span>"you are dead.  Then he eats you."</span>
</span><span>    <span>return</span> <span>:death</span>
</span><span>
</span><span>  <span>elsif</span> <span>action</span> <span>==</span> <span>"dodge!"</span>
</span><span>    <span>puts</span> <span>"Like a world class boxer you dodge, weave, slip and slide right"</span>
</span><span>    <span>puts</span> <span>"as the Gothon's blaster cranks a laser past your head."</span>
</span><span>    <span>puts</span> <span>"In the middle of your artful dodge your foot slips and you"</span>
</span><span>    <span>puts</span> <span>"bang your head on the metal wall and pass out."</span>
</span><span>    <span>puts</span> <span>"You wake up shortly after only to die as the Gothon stomps on"</span>
</span><span>    <span>puts</span> <span>"your head and eats you."</span>
</span><span>    <span>return</span> <span>:death</span>
</span><span>
</span><span>  <span>elsif</span> <span>action</span> <span>==</span> <span>"tell a joke"</span>
</span><span>    <span>puts</span> <span>"Lucky for you they made you learn Gothon insults in the academy."</span>
</span><span>    <span>puts</span> <span>"You tell the one Gothon joke you know:"</span>
</span><span>    <span>puts</span> <span>"Lbhe zbgure vf fb sng, jura fur fvgf nebhaq gur ubhfr, fur fvgf nebhaq gur ubhfr."</span>
</span><span>    <span>puts</span> <span>"The Gothon stops, tries not to laugh, then busts out laughing and can't move."</span>
</span><span>    <span>puts</span> <span>"While he's laughing you run up and shoot him square in the head"</span>
</span><span>    <span>puts</span> <span>"putting him down, then jump through the Weapon Armory door."</span>
</span><span>    <span>return</span> <span>:laser_weapon_armory</span>
</span><span>
</span><span>  <span>else</span>
</span><span>    <span>puts</span> <span>"DOES NOT COMPUTE!"</span>
</span><span>    <span>return</span> <span>:central_corridor</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>laser_weapon_armory</span><span>()</span>
</span><span>  <span>puts</span> <span>"You do a dive roll into the Weapon Armory, crouch and scan the room"</span>
</span><span>  <span>puts</span> <span>"for more Gothons that might be hiding.  It's dead quiet, too quiet."</span>
</span><span>  <span>puts</span> <span>"You stand up and run to the far side of the room and find the"</span>
</span><span>  <span>puts</span> <span>"neutron bomb in its container.  There's a keypad lock on the box"</span>
</span><span>  <span>puts</span> <span>"and you need the code to get the bomb out.  If you get the code"</span>
</span><span>  <span>puts</span> <span>"wrong 10 times then the lock closes forever and you can't"</span>
</span><span>  <span>puts</span> <span>"get the bomb.  The code is 3 digits."</span>
</span><span>  <span>code</span> <span>=</span> <span>"%s%s%s"</span> <span>%</span> <span>[</span><span>rand</span><span>(</span><span>9</span><span>)</span><span>+</span><span>1</span><span>,</span> <span>rand</span><span>(</span><span>9</span><span>)</span><span>+</span><span>1</span><span>,</span> <span>rand</span><span>(</span><span>9</span><span>)</span><span>+</span><span>1</span><span>]</span>
</span><span>  <span>print</span> <span>"[keypad]&gt; "</span>
</span><span>  <span>guess</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span><span>()</span>
</span><span>  <span>guesses</span> <span>=</span> <span>0</span>
</span><span>
</span><span>  <span>while</span> <span>guess</span> <span>!=</span> <span>code</span> <span>and</span> <span>guesses</span> <span>&lt;</span> <span>10</span>
</span><span>    <span>puts</span> <span>"BZZZZEDDD!"</span>
</span><span>    <span>guesses</span> <span>+=</span> <span>1</span>
</span><span>    <span>print</span> <span>"[keypad]&gt; "</span>
</span><span>    <span>guess</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span><span>()</span>
</span><span>  <span>end</span>
</span><span>
</span><span>  <span>if</span> <span>guess</span> <span>==</span> <span>code</span>
</span><span>    <span>puts</span> <span>"The container clicks open and the seal breaks, letting gas out."</span>
</span><span>    <span>puts</span> <span>"You grab the neutron bomb and run as fast as you can to the"</span>
</span><span>    <span>puts</span> <span>"bridge where you must place it in the right spot."</span>
</span><span>    <span>return</span> <span>:the_bridge</span>
</span><span>  <span>else</span>
</span><span>    <span>puts</span> <span>"The lock buzzes one last time and then you hear a sickening"</span>
</span><span>    <span>puts</span> <span>"melting sound as the mechanism is fused together."</span>
</span><span>    <span>puts</span> <span>"You decide to sit there, and finally the Gothons blow up the"</span>
</span><span>    <span>puts</span> <span>"ship from their ship and you die."</span>
</span><span>    <span>return</span> <span>:death</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>the_bridge</span><span>()</span>
</span><span>  <span>puts</span> <span>"You burst onto the Bridge with the netron destruct bomb"</span>
</span><span>  <span>puts</span> <span>"under your arm and surprise 5 Gothons who are trying to"</span>
</span><span>  <span>puts</span> <span>"take control of the ship.  Each of them has an even uglier"</span>
</span><span>  <span>puts</span> <span>"clown costume than the last.  They haven't pulled their"</span>
</span><span>  <span>puts</span> <span>"weapons out yet, as they see the active bomb under your"</span>
</span><span>  <span>puts</span> <span>"arm and don't want to set it off."</span>
</span><span>
</span><span>  <span>prompt</span><span>()</span>
</span><span>  <span>action</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span><span>()</span>
</span><span>
</span><span>  <span>if</span> <span>action</span> <span>==</span> <span>"throw the bomb"</span>
</span><span>    <span>puts</span> <span>"In a panic you throw the bomb at the group of Gothons"</span>
</span><span>    <span>puts</span> <span>"and make a leap for the door.  Right as you drop it a"</span>
</span><span>    <span>puts</span> <span>"Gothon shoots you right in the back killing you."</span>
</span><span>    <span>puts</span> <span>"As you die you see another Gothon frantically try to disarm"</span>
</span><span>    <span>puts</span> <span>"the bomb. You die knowing they will probably blow up when"</span>
</span><span>    <span>puts</span> <span>"it goes off."</span>
</span><span>    <span>return</span> <span>:death</span>
</span><span>
</span><span>  <span>elsif</span> <span>action</span> <span>==</span> <span>"slowly place the bomb"</span>
</span><span>    <span>puts</span> <span>"You point your blaster at the bomb under your arm"</span>
</span><span>    <span>puts</span> <span>"and the Gothons put their hands up and start to sweat."</span>
</span><span>    <span>puts</span> <span>"You inch backward to the door, open it, and then carefully"</span>
</span><span>    <span>puts</span> <span>"place the bomb on the floor, pointing your blaster at it."</span>
</span><span>    <span>puts</span> <span>"You then jump back through the door, punch the close button"</span>
</span><span>    <span>puts</span> <span>"and blast the lock so the Gothons can't get out."</span>
</span><span>    <span>puts</span> <span>"Now that the bomb is placed you run to the escape pod to"</span>
</span><span>    <span>puts</span> <span>"get off this tin can."</span>
</span><span>    <span>return</span> <span>:escape_pod</span>
</span><span>  <span>else</span>
</span><span>    <span>puts</span> <span>"DOES NOT COMPUTE!"</span>
</span><span>    <span>return</span> <span>:the_bridge</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>def</span> <span>escape_pod</span><span>()</span>
</span><span>  <span>puts</span> <span>"You rush through the ship desperately trying to make it to"</span>
</span><span>  <span>puts</span> <span>"the escape pod before the whole ship explodes.  It seems like"</span>
</span><span>  <span>puts</span> <span>"hardly any Gothons are on the ship, so your run is clear of"</span>
</span><span>  <span>puts</span> <span>"interference.  You get to the chamber with the escape pods, and"</span>
</span><span>  <span>puts</span> <span>"now need to pick one to take.  Some of them could be damaged"</span>
</span><span>  <span>puts</span> <span>"but you don't have time to look.  There's 5 pods, which one"</span>
</span><span>  <span>puts</span> <span>"do you take?"</span>
</span><span>
</span><span>  <span>good_pod</span> <span>=</span> <span>rand</span><span>(</span><span>5</span><span>)</span><span>+</span><span>1</span>
</span><span>  <span>print</span> <span>"[pod #]&gt;"</span>
</span><span>  <span>guess</span> <span>=</span> <span>gets</span><span>.</span><span>chomp</span><span>()</span>
</span><span>
</span><span>  <span>if</span> <span>guess</span><span>.</span><span>to_i</span> <span>!=</span> <span>good_pod</span>
</span><span>    <span>puts</span> <span>"You jump into pod %s and hit the eject button."</span> <span>%</span> <span>guess</span>
</span><span>    <span>puts</span> <span>"The pod escapes out into the void of space, then"</span>
</span><span>    <span>puts</span> <span>"implodes as the hull ruptures, crushing your body"</span>
</span><span>    <span>puts</span> <span>"into jam jelly."</span>
</span><span>    <span>return</span> <span>:death</span>
</span><span>  <span>else</span>
</span><span>    <span>puts</span> <span>"You jump into pod %s and hit the eject button."</span> <span>%</span> <span>guess</span>
</span><span>    <span>puts</span> <span>"The pod easily slides out into space heading to"</span>
</span><span>    <span>puts</span> <span>"the planet below.  As it flies to the planet, you look"</span>
</span><span>    <span>puts</span> <span>"back and see your ship implode then explode like a"</span>
</span><span>    <span>puts</span> <span>"bright star, taking out the Gothon ship at the same"</span>
</span><span>    <span>puts</span> <span>"time.  You won!"</span>
</span><span>    <span>Process</span><span>.</span><span>exit</span><span>(</span><span>0</span><span>)</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>ROOMS</span> <span>=</span> <span>{</span>
</span><span>  <span>:death</span> <span>=&gt;</span> <span>method</span><span>(</span><span>:death</span><span>),</span>
</span><span>  <span>:central_corridor</span> <span>=&gt;</span> <span>method</span><span>(</span><span>:central_corridor</span><span>),</span>
</span><span>  <span>:laser_weapon_armory</span> <span>=&gt;</span> <span>method</span><span>(</span><span>:laser_weapon_armory</span><span>),</span>
</span><span>  <span>:the_bridge</span> <span>=&gt;</span> <span>method</span><span>(</span><span>:the_bridge</span><span>),</span>
</span><span>  <span>:escape_pod</span> <span>=&gt;</span> <span>method</span><span>(</span><span>:escape_pod</span><span>)</span>
</span><span><span>}</span>
</span><span>
</span><span><span>def</span> <span>runner</span><span>(</span><span>map</span><span>,</span> <span>start</span><span>)</span>
</span><span>  <span>next_one</span> <span>=</span> <span>start</span>
</span><span>
</span><span>  <span>while</span> <span>true</span>
</span><span>    <span>room</span> <span>=</span> <span>map</span><span>[</span><span>next_one</span><span>]</span>
</span><span>    <span>puts</span> <span>"</span><span>\n</span><span>--------"</span>
</span><span>    <span>next_one</span> <span>=</span> <span>room</span><span>.</span><span>call</span><span>()</span>
</span><span>  <span>end</span>
</span><span><span>end</span>
</span><span>
</span><span><span>runner</span><span>(</span><span>ROOMS</span><span>,</span> <span>:central_corridor</span><span>)</span>
</span></code></pre></td></tr></tbody></table>

## 你應該看到的結果

```
$ ruby ex41.rb

--------
The Gothons of Planet Percal #25 have invaded your ship and destroyed
your entire crew.  You are the last surviving member and your last
mission is to get the neutron destruct bomb from the Weapons Armory,
put it in the bridge, and blow the ship up after getting into an 
escape pod.


You're running down the central corridor to the Weapons Armory when
a Gothon jumps out, red scaly skin, dark grimy teeth, and evil clown costume
flowing around his hate filled body.  He's blocking the door to the
Armory and about to pull a weapon to blast you.
> dodge!
Like a world class boxer you dodge, weave, slip and slide right
as the Gothon's blaster cranks a laser past your head.
In the middle of your artful dodge your foot slips and you
bang your head on the metal wall and pass out.
You wake up shortly after only to die as the Gothon stomps on
your head and eats you.

--------
Such a luser.

$ ruby ex41.rb 

--------
The Gothons of Planet Percal #25 have invaded your ship and destroyed
your entire crew.  You are the last surviving member and your last
mission is to get the neutron destruct bomb from the Weapons Armory,
put it in the bridge, and blow the ship up after getting into an 
escape pod.


You're running down the central corridor to the Weapons Armory when
a Gothon jumps out, red scaly skin, dark grimy teeth, and evil clown costume
flowing around his hate filled body.  He's blocking the door to the
Armory and about to pull a weapon to blast you.
> tell a joke
Lucky for you they made you learn Gothon insults in the academy.
You tell the one Gothon joke you know:
Lbhe zbgure vf fb sng, jura fur fvgf nebhaq gur ubhfr, fur fvgf nebhaq gur ubhfr.
The Gothon stops, tries not to laugh, then busts out laughing and can't move.
While he's laughing you run up and shoot him square in the head
putting him down, then jump through the Weapon Armory door.

--------
You do a dive roll into the Weapon Armory, crouch and scan the room
for more Gothons that might be hiding.  It's dead quiet, too quiet.
You stand up and run to the far side of the room and find the
neutron bomb in its container.  There's a keypad lock on the box
and you need the code to get the bomb out.  If you get the code
wrong 10 times then the lock closes forever and you can't
get the bomb.  The code is 3 digits.
[keypad]> 123 
BZZZZEDDD!
[keypad]> 234
BZZZZEDDD!
[keypad]> 345
BZZZZEDDD!
[keypad]> 456
BZZZZEDDD!
[keypad]> 567
BZZZZEDDD!
[keypad]> 678
BZZZZEDDD!
[keypad]> 789
BZZZZEDDD!
[keypad]> 384
BZZZZEDDD!
[keypad]> 764
BZZZZEDDD!
[keypad]> 354
BZZZZEDDD!
[keypad]> 263
The lock buzzes one last time and then you hear a sickening
melting sound as the mechanism is fused together.
You decide to sit there, and finally the Gothons blow up the
ship from their ship and you die.

--------
You died.  You kinda suck at this.
```

## 加分習題

1.  解釋一下返回至下一個房間的運作原理。 2.建立更多的房間，讓遊戲規模變大。
2.  除了讓每個函式印出自己以外，試試學習一下「文件註解(doc comments)」。
3.  看看你能不能將房間描述寫成文件註解，然後修改運行它的程式碼，讓它把文檔註解打印出來。
4.  一旦你用了文件註解作為房間描述，你還需要讓這個函式打出用戶提示嗎？試著讓運行函數的代碼打出用戶提示來，然後將用戶輸入傳遞到各個函式。你的函式應該只是一些 `if` 語句組合，將結果印出來，並且返回下一個房間。
5.  這其實是一個小版本的「有限狀態機(finite state machine)」，找資料閱讀了解一下，雖然你可能看不懂，但還是找來看看吧
