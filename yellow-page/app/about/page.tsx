import Image from 'next/image';
import { Inter } from 'next/font/google';

import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <section className='mt-8 max-w-3xl mx-4 md:mx-0'>
      <div className='flex gap-8 flex-col md:flex-row'>
        <div>
          <h1 className='font-bold text-2xl'>About</h1>
          <p className='mt-2'>
            This website showcases Chinese-language web pages at the turn of the
            millennium. The web pages are collected from "Internet directory"
            books published in the late 1990s and early 2000s in mainland China,
            covering web pages produced by people based in Chinese-speaking
            regions and diaspora communities across the globe.
          </p>

          <p className='mt-2'>
            These directory books - often marketed as “yellow pages” of the
            Internet - provide lists of URLs of Chinese-language web pages
            organised into hierarchical categories for Chinese-speaking Internet
            users. These directory books provide insight into how the Internet
            was experienced and used by Chinese-speaking users at the turn of
            the millenium.
          </p>

          <p className='mt-2'>
            On this website, you can visit some of the URLs featured in these
            books via the Internet Archive's Wayback Machine.
          </p>

          <p className='mt-2'>
            You can use the search box on the main page to search for web pages
            containing certain keywords in their titles or category information
            (to be implemented), or use the book filter on the right column to
            view web pages included in one particular directory book.
          </p>

          <p className='mt-2'>
            The content on these web pages does not reflect the views or
            opinions of the owners of this website. Visitors are advised to use
            their own discretion when browsing these websites and should not
            rely on the information presented as accurate or current. The owners
            of this website are not responsible for any harm, damage, or loss
            that may occur from using the content or information provided on
            these old websites. If you are the owner of one of the archived
            websites and wish to have your site removed from this website,
            please contact tktktk@tktktk.com. Please note that the web pages
            showcased on the website are archived the copies stored on the
            Wayback Machine, and this website does not host any archived web
            page material.
          </p>

          <p className='mt-2'>
            The project is partly sponsored by the Puget Sound Public Interest
            Technology Clinic of the University of Washington. This website is
            not affiliated with the Internet Archive.
          </p>
        </div>
        <div>
          <h1 className='font-bold text-2xl'>关于</h1>

          <p className='mt-2'>
            本网站展示20世纪末至21世纪初时期互联网上的一些中文网页。这些网页都是收集自当时出版的一些“网址大全”类参考书，其中包括了来自两岸四地以及海外中文社区的网页。
          </p>
          <p className='mt-2'>
            这些“网址大全”书籍（在销售时经常也被称为互联网的“黄页”）给当时的中文互联网用户提供了按主题分类的中文网页网址列表。今天，这些书籍以及上面登载的网址给互联网历史研究者提供了研究世纪之交时中文用户互联网使用体验的材料。
          </p>
          <p className='mt-2'>
            在本网站上，您可以透过互联网档案馆(Internet Archive)的 Wayback
            Machine 服务访问一部分被登载在这些书籍中的网址。
          </p>
          <p className='mt-2'>
            在网站主页上，您可以使用搜索框检索标题或者分类信息中带有指定关键词的网页，也可以用主页右侧的书籍标签过滤出在某本书中出现的网页。
          </p>
          <p className='mt-2'>
            本网站所展示的网页上的内容不代表本网站拥有者的观点或意见。用户在访问这些网页时，必须谨慎对待这些网页上的信息，并且不能把这些信息当作是准确的或者最新的。本网站不为因为使用老网页上的信息所导致的任何伤害或者损失承担责任。如果你是在本网站上展示的一个网页的原拥有者，并希望您的网页不在此被展示，请致信
            tktktk@tktktk.com。请注意本网站上呈现的网页都是来自于 Wayback
            Machine 服务，本网站自身不存储任何老网页内容。
          </p>
          <p className='mt-2'>
            本网站由华盛顿大学 Puget Sound Public Interest Technology Clinic
            部分赞助开发。本网站与互联网档案馆(Internet Archive)没有关系。
          </p>
        </div>
      </div>

      <p className='mt-16'>
        Designed and developed by: Tianhao Yao, Richard Lewei Huang
      </p>

      <p className='mb-24'>Made in Seattle, WA</p>
    </section>
  );
}
