
# 聚焦窗口
ctrl + cmd - h : yabai -m window --focus west
ctrl + cmd - j : yabai -m window --focus south
ctrl + cmd - k : yabai -m window --focus north
ctrl + cmd - l : yabai -m window --focus east

# 移动窗口
ctrl + alt - h : yabai -m window --swap west
ctrl + alt - j : yabai -m window --swap south
ctrl + alt - k : yabai -m window --swap north
ctrl + alt - l : yabai -m window --swap east

# 窗口切换最大化
alt - x : yabai -m window --toggle zoom-fullscreen

# 切换到对应空间
alt - 1 : yabai  -m space --focus 1
alt - 2 : yabai  -m space --focus 2
alt - 3 : yabai  -m space --focus 3
alt - 4 : yabai  -m space --focus 4
alt - 5 : yabai  -m space --focus 5
alt - 6 : yabai  -m space --focus 6
alt - 7 : yabai  -m space --focus 7
alt - 8 : yabai  -m space --focus 8
alt - 9 : yabai  -m space --focus 9

# 将窗口移动到对应空间
shift + alt - 1 :yabai -m window --space 1 --focus
shift + alt - 2 :yabai -m window --space 2 --focus
shift + alt - 3 :yabai -m window --space 3 --focus
shift + alt - 4 :yabai -m window --space 4 --focus
shift + alt - 5 :yabai -m window --space 5 --focus
shift + alt - 6 :yabai -m window --space 6 --focus
shift + alt - 7 :yabai -m window --space 7 --focus
shift + alt - 8 :yabai -m window --space 8 --focus
shift + alt - 9 :yabai -m window --space 9 --focus


# 移动当前空间到上一个显示器
alt - left : yabai -m window --space prev && yabai -m space --focus prev
alt - A : yabai -m window --space prev && yabai -m space --focus prev

# 移动当前空间到下一个显示器
alt - right : yabai -m window --space next && yabai -m space --focus next

alt - F : yabai -m window --space next && yabai -m space --focus next

# 创建和销毁空间
yabai -m space --create

yabai -m space --destroy
