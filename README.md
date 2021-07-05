# E-PEDIA——JavaScript语言Web程序设计课程实践
信息科学技术学院 1900012921 俞跃江

## 功能简介

本网站是一个网页APP的原型，用于给在线上的高中和大学生进行自主选课。

本网站的名称叫`E-PEDIA`，含义是“网上选课百科全书”。它的灵感来源于疫情时代，线下课程转入线上，为了帮助老师和同学更好地沟通，我希望用这个网站整合课程资源，并且在学生和老师注册后进行“人-课”匹配与个性化推荐。

本网站主要在`wix.com`上进行设计与制作，由于服务器在海外，点击按钮可能响应时间略长，请耐心等待。如果使用VPN会有一定提速。

### 1. 页面介绍

##### 主界面


作为用户注册、登录界面。在中间设计了醒目的标题，并且在颜色、字体上尽量统一，对用户友好的同时与选课主题契合。左边的`REGISTER`按钮为新用户注册，右边的`LOGIN`按钮为老用户登录。

#### 注册/登录界面


填入注册信息后根据提示，进入下一阶段填写个人信息。

#### 个人信息完善


按照提示完成即可

#### 课程匹配


在左侧选中课程的限制条件（若不选则无限制），点击`MATCH`后自动从课程库中选出符合条件的课程，最多12条。为了网页效果需要，事先利用随机程序生成了约1000门课程。

#### 个性化课程推荐

对于每位学生，在填写了个人信息后，系统自动根据个人喜好进行推荐，参考以往选课同学对课程的评分，利用K-近邻算法，选出平均得分最高的五门课程。目前正在试验阶段，网站运行相对不稳定。

#### 课程管理


点击`MY COURSE`可进入个人课程管理，学生可以更新课程状态（例如选课、退课、已修完）并进行评分，作为之后个性化推荐的依据并动态更新。

## 提交文件说明

### 项目网址

https://1900012921.wixsite.com/e-pedia

### 项目源代码

在github上已经开源：https://github.com/pkuyyj/E-PEDIA

### 其他文件

随机生成的学生信息、课程信息、学生评分文件也一并放在github上。
