## 1. 将项目保存到你的仓库

搜索NeteaseCloudMusicApi

并fork

随后复制该仓库地址https://github.com/XXXXXX/NeteaseCloudMusicApi.git

## 2. 将项目保存到服务器上

在www>wwwroot下新建文件夹

文件名需要非中文;

随后打开新建的文件夹

右键打开终端

终端输入

**git clone https://github.com/XXXXXX/NeteaseCloudMusicApi.git**

完成之后你会得到一个名为**NeteaseCloudMusicApi**的文件夹

(或者你可以将步骤一的项目代码下载到本地,解压后再把项目上传)

## 3. 项目搭建

在软件商店搜索PM2管理器并安装

点击打开PM2管理器

点击添加项目

启动文件选择app.js,如下
![](http://www.glfy.site:999/images/glfy-blog/article/宝塔面板部署网易云api/PM2添加项目.png)

其他的不用修改

随后打开模块管理,安装所有依赖
![](http://www.glfy.site:999/images/glfy-blog/article/宝塔面板部署网易云api/模块安装.png)


## 4. 端口放行

打开右侧安全

放行端口3000,备注填写网易云api
![](http://www.glfy.site:999/images/glfy-blog/article/宝塔面板部署网易云api/宝塔端口放行.png)

此外,我用的是腾讯云服务器,还需要在后台管理放行3000端口
![](http://www.glfy.site:999/images/glfy-blog/article/宝塔面板部署网易云api/腾讯云服务器端口放行.png)

最后,假如你的服务器ip为123.123.11.11,直接访问http://123.123.11.11:3000即可

出现如下页面则成功
![](http://www.glfy.site:999/images/glfy-blog/article/宝塔面板部署网易云api/部署成功.png)



