20141203
同事遇到一个问题，在其他人使用的一个BS系统中，有我们需要的数据，我们需要将其合理的格式化成JSON。
于是我写了这段代码，只是一些很基础的功能。

在文本框里面可以输入的内容：
HD071413107703_湖北华电西塞山发电有限公司3号机组烟气排放口_32_115.10555556_30.21666667_35@17325360903598_磁湖污水处理厂_32_115.07777778_30.21805556_32@17325360909654_湖北华电西塞山发电有限公司1号机组烟气排放口_32_115.10055556_30.22166667_35@17325360811525_湖北华电西塞山发电有限公司（2号机组）_32_115.10527778_30.23305556_35@HB071413201007_黄石团城山污水处理厂_36_115.05000000_30.21666667_32@17325360806233_湖北新冶钢股份有限公司（7＃电炉）_32_115.00555556_30.21694444_35@17325360806230_湖北新冶钢股份有限公司（8＃电炉）_32_115.00833333_30.23083333_35

后来发现不能在ArcGIS for Desktop中无法正常的转换数据，发现是在ArcGIS for Desktop里面导入JSON需要固定的格式，于是又安装ArcGIS所需的格式重新的编写程序。