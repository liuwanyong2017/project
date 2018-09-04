function roll($box,ind,count,arr){
    this.init($box,ind,count,arr)
    this.bind()
    this.autoplay()
}
roll.prototype = {
    init:function($box,ind,count,arr){
        $box.addClass('rollBox').append(`<div class="box">
                                            <ul>
                                            </ul>
                                            <span class="pre"><</span>
                                            <span class="next">></span>
                                            <div class="barbox"></div>
                                        </div>`)
        $box.css({
            'overflow': 'hidden',
            'position': 'relative'
        })                                
        this.$box = $box.find('.box')
        this.$ul = this.$box.find('ul')
        for(var i=0;i<count;i++){
            this.$ul.append('<li><a href=""><img src="" alt=""></a></li>')
        }
        this.$ul.find('li img').width($box.width()).height($box.height())

        this.liCount = count
        for(var i=0;i<this.liCount;i++){
            this.$box.find('li img').eq(i).attr('src','img/img' +(i+ind)+'.jpg')
            if(arr){
                this.$ul.find('li a').eq(i).attr({
                    href:arr[i],
                    target:'_blank'
                })
            }
            this.$box.find('.barbox').append('<div class="bar"></div>')    
        }
        this.$box.find('.barbox .bar').width($box.width() /(this.liCount+10)).eq(0).addClass('active')
        this.liWid = this.$box.find('ul li').outerWidth(true)
        this.index = 0
        this.isMoving 
        this.$ul.prepend(this.$box.find('ul li').last().clone())
        this.$ul.append(this.$box.find('ul li').eq(1).clone())
        this.$ul.css('width',this.liWid*(this.liCount +2) +'')
        this.$ul.css('left','-='+this.liWid)
    },
    bind:function(){
        var self = this 
        this.$box.find('.next').click(function(e){
            console.log('next')

            self.stopAuto()
            self.playNext(1)
        })
        this.$box.find('.pre').click(function(e){
            console.log('pre')

            self.stopAuto()
            self.playPre(1)
        })
        self.$box.find('.bar').click(function(){
            console.log(self.index)

            self.stopAuto()
            self.active($(this))
            var ind = $(this).index()
            if(ind < self.index){
                self.playPre( self.index - ind )
            }else if(ind > self.index){
                self.playNext(ind - self.index)
            }
        })
    },
    active:function($node){
        $node.addClass('active').siblings().removeClass('active')
    },
    playNext:function(length){
       var self = this
       if(self.isMoving) return;
       self.isMoving = true
       console.log(self.index)
       
       self.$ul.animate({
           left:'-='+self.liWid * length
       },1000,function(){
            self.isMoving = false
            self.index += 1*length
            if(self.index === self.liCount){
                self.$ul.css('left','+='+self.liWid*self.liCount)
                self.index = 0
            }
            console.log(self.index)
            self.active(self.$box.find('.bar').eq(self.index))
       })
       
    },
    playPre:function(length){
       var self = this
       if(self.isMoving) return;
       self.isMoving = true
       
       self.$ul.animate({
           left:'+='+self.liWid * length
       },1000,function(){
            self.isMoving = false
            self.index -= 1*length
            if(self.index === -1){
                self.$ul.css('left','-='+self.liWid*self.liCount)
                self.index = self.liCount - 1
            }
            console.log(self.index)
            self.active(self.$box.find('.bar').eq(self.index))
       })
       
    },
    autoplay:function(){
        var self = this
        self.play = setInterval(function(){
            self.playNext(1)
        },1000) 
    },
    stopAuto:function(){
        clearInterval(this.play)
    }
}
var str ='http://baidu.com'
var arr1 = []
for(var i=0;i<8;i++){
    arr1.push(str)
} 
console.log(arr1)
new roll($('section'),1,8,arr1)
//new.roll($('.box').eq(1))
/*
function roll($box) {
    this.init($box)
    this.bind()
    this.autoplay()
}
roll.prototype = {
    init: function($box) {
        this.$box = $box
        this.index = 0
        this.doing = false
        this.liwid = this.$box.find('li').outerWidth(true)
        this.licount = this.$box.find('li').length
        this.$box.find('ul').append(this.$box.find('li').first().clone())
        this.$box.find('ul').prepend(this.$box.find('li').last().clone())
        this.$box.find('ul').width(this.liwid * (this.licount + 2))
        this.$box.find('ul').css('left', -this.liwid)
    },
    bind: function() {
        var self = this
        this.$box.find('.next').on('click', function() {
                console.log('nxt,,,')
                self.playnext(1)
            }),
            this.$box.find('.pre').on('click', function() {
                console.log('pre,,,')
                self.playpre(1)
            }),
            this.$box.find('.bar').on('click', function() {
                self.stopauto()
                console.log($(this).index())
                self.active($(this))
                var index = $(this).index()
                if (index > self.index) {
                    self.playnext(index - self.index)
                } else if (index < self.index) {
                    self.playpre(self.index - index)
                }
            })
    },

    
    playnext: function(leng) {
        var self = this
        if (self.doing) return;
        self.doing = true
        self.$box.find('ul').animate({
            left: '-=' + self.liwid * leng
        }, function() {
            self.index += leng
            if (self.index === self.licount) {
                self.$box.find('ul').css('left', -self.liwid)
                self.index = 0
            }
            self.active(self.$box.find('.bar').eq(self.index))
            self.doing = false
        })
    },
    playpre: function(leng) {
        var self = this
        if (self.doing) return;
        self.doing = true
        self.$box.find('ul').animate({
            left: '+=' + self.liwid * leng
        }, function() {
            self.index -= leng
            if (self.index < 0) {
                self.$box.find('ul').css('left', -self.liwid * self.licount)
                self.index = self.licount - 1
            }
            //console.log(self.index)
            self.active(self.$box.find('.bar').eq(self.index))
            self.doing = false
        })
    },
    active: function(node) {
        node.addClass('active').siblings().removeClass('active')
    },
    autoplay: function() {
        var self = this
        self.clock = setInterval(function() {
            self.playnext(1)
        }, 1500)
    },
    stopauto: function() {
        clearInterval(this.clock)
    }
}
new roll($('.box').eq(0))
new roll($('.box').eq(1))
*/