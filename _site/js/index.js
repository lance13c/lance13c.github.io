/**
 * Created by Lance on 9/5/2016.
 */


// Sets Global Data
// Gulp will replace the VAR below with JSON Jekyll Data
let csData = JSON.parse(`{
  "projects": [
    {
      "name": "Web Lego Car",
      "short_des": "Controlling a lego car via a webpage controller",
      "date": "November 2016 - December 2016",
      "description": "",
      "github_url": "https://github.com/lance13c/web-lego-car",
      "download_url": "",
      "cs_url": "/projects/weblegocar",
      "blog": "",
      "images": ["https://raw.githubusercontent.com/lance13c/web-lego-car/master/images/0.jpg"],
      "videos": ""
    },
    {
      "name": "Bluetooth Lights",
      "short_des": "Creatively control multiple RPG LED's with a PS3 Move Controller",
      "date": "May 2015 - Present",
      "description": "",
      "github_url": "https://github.com/lance13c/BluetoothLights",
      "download_url": "",
      "demo_url": "",
      "cs_url": "/projects/bluetoothlights",
      "blog": "",
      "images": ["/assets/images/projects/bluetoothlights/btl2.jpg", "/assets/images/projects/bluetoothlights/btl3.jpg", "/assets/images/projects/bluetoothlights/btl4.jpg","/assets/images/projects/bluetoothlights/btl5.jpg",
        "/assets/images/projects/bluetoothlights/btl6.jpg", "/assets/images/projects/bluetoothlights/btl7.jpg","/assets/images/projects/bluetoothlights/btl8.jpg", "/assets/images/projects/bluetoothlights/btl9.jpg", "/assets/images/projects/bluetoothlights/btl10.jpg",
        "/assets/images/projects/bluetoothlights/btl11.jpg", "/assets/images/projects/bluetoothlights/btl12.jpg", "/assets/images/projects/bluetoothlights/btl13.jpg", "/assets/images/projects/bluetoothlights/btl15.jpg"],
      "videos": "IlwwBhS5HJY"
    },
    {
      "name": "Hero2.0",
      "short_des": "2D Platform Shooter. Inspired by Thing Thing Arena 2",
      "description": "2D Platform Shooter. Inspired by Thing Thing Arena 2. Developed during junior year in high school",
      "date": "January 2012 - November 2012",
      "github_url": "",
      "cs_url": "/projects/hero2",
      "download_url": "https://www.dropbox.com/s/6winwjc686q0nm1/Hero2.0.exe?dl=0",
      "demo_url": "",
      "blog": "",
      "images": ["/assets/images/projects/hero/hero0.png", "/assets/images/projects/hero/hero1.png", "/assets/images/projects/hero/hero2.png", "/assets/images/projects/hero/hero3.png", "/assets/images/projects/hero/hero4.png", "/assets/images/projects/hero/hero5.png",
        "/assets/images/projects/hero/hero7.png", "/assets/images/projects/hero/hero8.png", "/assets/images/projects/hero/hero9.png", "/assets/images/projects/hero/hero10.png", "/assets/images/projects/hero/hero11.png",
        "/assets/images/projects/hero/hero12.png", "/assets/images/projects/hero/hero13.png"],
      "videos": ""
    },
    {
      "name": "Trebuchet",
      "short_des": "Trebuchet created as a side project. Participated in the Vermont Mini Maker Fair throwing 26 pumpkins.",
      "date": "March 2012 - September 2012",
      "description": "",
      "github_url": "",
      "download_url": "",
      "demo_url": "",
      "cs_url": "/projects/trebuchet",
      "blog": "",
      "images": ["/assets/images/projects/trebuchet/trebuchet4.jpg", "/assets/images/projects/trebuchet/trebuchet5.jpg", "/assets/images/projects/trebuchet/trebuchet3.jpg", "/assets/images/projects/trebuchet/trebuchet1.jpg",
        "/assets/images/projects/trebuchet/trebuchet2.jpg", "/assets/images/projects/trebuchet/trebuchet6.jpg", "/assets/images/projects/trebuchet/trebuchet7.jpg", "/assets/images/projects/trebuchet/trebuchet8.jpg",
        "/assets/images/projects/trebuchet/trebuchet9.jpg"],
      "videos": "M3tX7j7sx44"
    },
    {
      "name": "SpaceFighter",
      "short_des": "Wave Based SpaceFighter",
      "date": "August 2010",
      "description": "",
      "github_url": "",
      "download_url": "",
      "demo_url": "",
      "cs_url": "/projects/spacefighter",
      "blog": "",
      "images": ["/assets/images/projects/spacefighter/sf0.png", "/assets/images/projects/spacefighter/sf1.png", "/assets/images/projects/spacefighter/sf2.png",
        "/assets/images/projects/spacefighter/sf3.png", "/assets/images/projects/spacefighter/sf4.png", "/assets/images/projects/spacefighter/sf5.png",
        "/assets/images/projects/spacefighter/sf6.png", "/assets/images/projects/spacefighter/sf7.png"],
      "videos": "",
      "variables": {}
    },
    {
      "name": "HololensTimer",
      "short_des": "Timer Application writen in Aframe & D3",
      "date": "March 2017",
      "description": "",
      "github_url": "",
      "download_url": "",
      "demo_url": "",
      "cs_url": "/projects/hololens-timer",
      "blog": "",
      "images": ["/assets/images/projects/trebuchet/trebuchet4.jpg"],
      "videos": "",
      "variables": {
        "time": "00:00"
      }
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "main.home",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        },
        {
          "name" : "Browser Pal",
          "url": "main.projects",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet7.jpg"
        }
      ]
    },
    {
      "name": "Java",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "main.skills",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    },
    {
      "name": "Piano",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    },
    {
      "name": "Swing Dancing",
      "experience": "4/5",
      "description": "",
      "projects" : []
    },
    {
      "name": "Python",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    },
    {
      "name": "NodeJS",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "main.skills",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    },
    {
      "name": "AngularJS",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "Trebuchet",
          "url": "main.projects",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    },
    {
      "name": "CSS",
      "experience": "4/5",
      "description": "",
      "projects" : [
        {
          "name" : "CicilioStudio",
          "url": "",
          "icon_image": "/assets/images/projects/trebuchet/trebuchet1.jpg"
        }
      ]
    }
  ],
  "life" : {
    "blog" : "Music and Dancing ",
    "bio": "Passionate VR Web Developer who loves swing dancing and exploring music at the piano.",
    "images": [],
    "videos": []
  },
  "resume": {
    "url": "/resume/resume.pdf"
  },
  "specific_project": {
    "title_image": "/assets/images/background/hexabump/hexabump.png"
  },
  "site": {
    "fav_icon": "/assets/images/projects/ciciliostudio/favicon5.png"
  },
  "new_knowledge": [
    {
      "local_url": "",
      "external_url_list": [],
      "date": "3/17/2017",
      "blurb": "Looking into D3.js"
    },
    {
      "local_url": "",
      "external_url_list": [],
      "date": "3/16/2017",
      "blurb": "Looking into Aframe.js"
    }
  ],
  "weekly_life": {
    "school_week": {
      "swing dancing": {
        "average_hours": 10
      },
      "classes": {
        "average_hours": 20
      },
      "school_work": {
        "average_hours": 20
      }
    }
  }
}`);


// Nav bar, side nav instantiation
$(".cs-mobile-menu").sideNav();

