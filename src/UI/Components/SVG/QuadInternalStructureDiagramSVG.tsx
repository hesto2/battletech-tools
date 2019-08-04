
import React from 'react';

export default class QuadInternalStructureDiagramSVG extends React.Component<IQuadInternalStructureDiagramSVGProps, IQuadInternalStructureDiagramSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    theWidth = 744;
    theHeight = 627;
    xLoc = 0;
    yLoc = 0;
    baseWidth = 744.09448819;
    baseHeight = 1052.3622047;
    constructor(props: IQuadInternalStructureDiagramSVGProps) {
        super(props);
        this.state = {
        }
        if( this.props.bgColor ) {
            this.bgColor = this.props.bgColor;
        }
        if( this.props.strokeColor ) {
            this.strokeColor = this.props.strokeColor;
        }

        if( this.props.width ) {
            this.theWidth = this.props.width;
            this.theHeight = Math.round( this.props.width / this.baseWidth * this.baseHeight );

        }

        if( this.props.xLoc  ) {
            this.xLoc = this.props.xLoc;
        }

        if( this.props.yLoc ) {
            this.yLoc = this.props.yLoc;
        }

        // if( typeof(standAlone) == "undefined" )
        //     standAlone = true;

        // if( !baseFillColor )
        //     baseFillColor = colorTan;

        // if( !lineColor )
        //     lineColor = colorGold;
    }

    render() {



        // var svg = "";

        // if( standAlone ) {
        //     var svg = "<!DOCTYPE HTML><svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xml:space=\"preserve\" height=\"" + theHeight  + " px\" width=\"" + theWidth  + "px\" viewBox=\"0 0 790 100\" ><g>\n";

        return (
<svg
    viewBox="0 0 210 297"
    y={this.yLoc}
    x={this.xLoc}
    width={this.theWidth}
    height={this.theHeight}
    id="quadInternalStructure"
    version="1.1"
>
    <g>
    <path
        id="path3702"
        d="m 4.66352,294.76394 c -0.6141,-0.99364 -0.56223,-7.97663 0.0639,-8.60276 0.75269,-0.7527 7.28525,-3.49772 8.3337,-3.50189 1.21807,-0.005 1.24312,-1.44515 0.0532,-3.06029 -0.93326,-1.26681 -1.07009,-2.09335 -0.72619,-4.38666 0.23306,-1.55416 0.89252,-3.27624 1.46548,-3.82686 0.72256,-0.6944 1.27308,-2.83524 1.79684,-6.98755 0.48602,-3.85307 1.15475,-6.56445 1.87653,-7.60845 0.99127,-1.43377 1.12143,-2.8338 1.12143,-12.06306 0,-9.86979 0.0816,-10.61624 1.49075,-13.64335 1.69295,-3.63665 1.90345,-6.33257 0.62672,-8.0267 -0.71066,-0.943 -0.80612,-2.60091 -0.50641,-8.79533 0.32646,-6.74736 0.24802,-7.76734 -0.67586,-8.78822 -0.88983,-0.98325 -0.98482,-1.85071 -0.63905,-5.83615 0.48632,-5.60564 1.3232,-9.17106 2.15263,-9.17106 0.33369,0 0.88844,-0.80817 1.23277,-1.79593 0.34434,-0.98776 0.99113,-1.79592 1.43733,-1.79592 1.89662,0 2.92155,-10.51659 1.16686,-11.97285 -1.32981,-1.10364 -1.16693,-4.23224 0.23947,-4.60003 1.77334,-0.46374 2.26183,-5.04882 0.80313,-7.53829 -0.88474,-1.50993 -1.03872,-2.51586 -0.70777,-4.62366 0.33612,-2.14075 0.18088,-3.09437 -0.75604,-4.6443 -1.38366,-2.28896 -1.04476,-6.24171 0.70531,-8.22651 0.58064,-0.65851 1.21625,-2.63918 1.41248,-4.40149 0.1985,-1.78265 1.03005,-4.35304 1.87433,-5.7937 1.7736,-3.02641 1.87777,-4.02599 0.53567,-5.13984 -0.84398,-0.70044 -0.93199,-1.74586 -0.62663,-7.44374 0.19539,-3.64587 0.62566,-7.34009 0.95616,-8.20937 0.93205,-2.45146 3.50777,-3.43379 9.00361,-3.43379 4.9757,0 5.67804,-0.41232 3.99868,-2.34743 -0.86429,-0.99592 -2.49431,-3.34662 -12.07085,-17.407768 -3.25151,-4.774173 -7.8834,-11.508898 -10.29309,-14.966057 -5.56837,-7.988888 -6.41267,-9.6449 -5.91937,-11.610356 0.32801,-1.306902 0.72931,-1.559775 2.47532,-1.559775 1.76241,0 2.0836,-0.20777 2.08223,-1.346945 -10e-4,-0.940162 -0.67911,-1.713955 -2.24491,-2.562189 -1.95055,-1.056657 -2.23065,-1.47709 -2.14644,-3.221809 0.0757,-1.568077 0.82791,-2.745325 3.4422,-5.387182 3.27402,-3.308546 3.34533,-3.453292 3.34533,-6.78996 v -3.409347 l 8.39171,-8.229018 c 4.61544,-4.525961 8.72363,-8.411201 9.1293,-8.633866 0.40567,-0.222666 2.28467,-0.532851 4.17556,-0.6893 3.45746,-0.286066 4.37185,-0.73386 6.86905,-3.363938 2.07238,-2.182639 5.07636,-4.255554 5.6517,-3.899978 0.28306,0.17494 1.05102,0.147837 1.70658,-0.06023 0.99495,-0.315785 1.19193,-0.908875 1.19193,-3.588858 0,-2.8736895 0.14133,-3.2306275 1.34694,-3.4018525 2.63317,-0.373968 5.83677,0.212696 5.83677,1.068867 0,0.6343745 1.00157,0.8350845 4.16717,0.8350845 3.31367,0 4.38653,-0.232263 5.23812,-1.1340055 0.83024,-0.879134 1.76728,-1.098901 4.16914,-0.977813 2.63247,0.132713 3.44238,0.482383 5.38778,2.3260975 l 2.28959,2.169905 19.15655,-0.0087 19.15656,-0.0087 2.31101,-2.081358 c 1.27105,-1.1447465 2.75269,-2.0985545 3.29253,-2.1195725 0.53984,-0.02102 1.88607,-0.126676 2.99164,-0.234795 1.37104,-0.13408 2.37025,0.163558 3.14287,0.936179 1.51292,1.5129265 8.70626,1.6472025 9.77728,0.18251 0.91224,-1.247569 6.2058,-1.394247 6.96622,-0.193027 0.29385,0.464175 0.53839,1.9888575 0.54343,3.3881835 0.008,2.162701 0.19317,2.54423 1.23618,2.54423 1.91572,0 4.2011,1.471004 7.45075,4.795738 2.77463,2.838746 3.18543,3.053277 5.6871,2.969991 1.48304,-0.04938 3.11475,-0.06583 3.626,-0.03658 0.51125,0.02925 4.88882,3.929904 9.72794,8.668103 l 8.79838,8.614911 v 3.526339 c 0,3.515941 0.0106,3.536816 3.59185,7.080712 2.93465,2.904026 3.59186,3.91293 3.59186,5.513993 0,1.67785 -0.32279,2.111261 -2.24491,3.014283 -1.424,0.669001 -2.31302,1.532351 -2.43118,2.360962 -0.15988,1.121113 0.13714,1.332937 2.09524,1.494271 2.0775,0.17117 2.29799,0.357778 2.46563,2.086819 0.14454,1.490823 -0.56296,3.013864 -3.29254,7.087925 -1.91214,2.853997 -3.88071,5.821137 -4.37459,6.593643 -1.47098,2.300834 -8.05732,11.932785 -8.381,12.256459 -0.85008,0.850084 -2.99321,4.215872 -2.99321,4.70085 0,0.307361 -0.40408,0.713893 -0.89796,0.903417 -0.49388,0.189518 -0.89796,0.651007 -0.89796,1.025517 0,0.37453 -0.80817,1.70135 -1.79593,2.94849 -0.98776,1.24714 -1.79593,2.4469 -1.79593,2.66611 0,0.21922 -1.05827,1.78637 -2.3517,3.48257 -1.29344,1.6962 -2.2204,3.29646 -2.05992,3.55612 0.16048,0.25966 2.27877,0.47212 4.7073,0.47212 6.99243,0 9.28529,1.37893 9.27864,5.5802 -0.002,1.3758 0.30366,4.5228 0.67962,6.99332 0.63615,4.18018 0.59615,4.63561 -0.57638,6.56369 l -1.25996,2.07185 1.40147,2.41594 c 0.77082,1.32877 1.58877,3.95399 1.81767,5.83384 0.30224,2.48207 0.81217,3.79334 1.86241,4.78914 1.17261,1.11181 1.44818,1.97393 1.45657,4.55687 0.007,2.07368 -0.30957,3.50553 -0.90616,4.10213 -0.6587,0.6587 -0.88682,1.99563 -0.81097,4.75277 0.0779,2.83266 -0.15214,4.12099 -0.87942,4.92464 -1.71455,1.89456 -0.91219,6.68119 1.11994,6.68119 1.45224,0 1.65898,2.6176 0.40609,5.14164 -1.58422,3.19152 -1.22041,10.74992 0.53957,11.21016 0.61904,0.16188 1.40874,1.03926 1.7549,1.94974 0.34616,0.91047 1.0468,1.96063 1.55697,2.33367 0.61975,0.45318 1.10765,2.35672 1.47017,5.73589 0.29841,2.78169 0.66887,5.60462 0.82323,6.27318 0.15436,0.66855 -0.22974,1.9936 -0.85356,2.94456 -1.01229,1.54315 -1.09695,2.51757 -0.78758,9.06498 0.29861,6.31984 0.20994,7.47266 -0.64015,8.32275 -1.65139,1.65139 -1.16333,4.20454 2.06074,10.77984 0.33669,0.68667 0.51443,5.57637 0.4163,11.4522 -0.15451,9.25076 -0.0637,10.37361 0.92817,11.47758 0.80021,0.89065 1.23341,2.74305 1.59171,6.8064 0.56073,6.35897 0.89056,7.47021 2.46774,8.31429 1.45718,0.77987 1.62869,6.58293 0.22889,7.74466 -1.37533,1.14143 -1.07325,2.36073 0.7483,3.02039 0.90545,0.32789 2.18505,0.83281 2.84355,1.12205 0.65851,0.28923 2.08346,0.85955 3.16658,1.26737 l 1.96928,0.7415 -0.17336,4.55704 -0.17336,4.55703 -19.15655,0.16735 c -10.53611,0.092 -19.77432,0.0166 -20.52937,-0.16756 -1.29514,-0.31596 -1.36287,-0.57943 -1.19728,-4.65717 0.17212,-4.23838 0.21328,-4.33887 2.12111,-5.17859 2.23754,-0.98484 2.38538,-1.5736 0.82751,-3.29558 -1.6776,-1.85431 -1.9919,-5.21691 -0.68802,-7.36096 0.92858,-1.52694 1.04186,-2.69471 0.77681,-8.00818 -0.22788,-4.56859 -0.0873,-6.76164 0.52944,-8.25801 0.74499,-1.8076 0.71099,-2.51669 -0.3015,-6.28574 -2.4216,-9.01458 -2.55177,-9.98571 -1.42309,-10.61736 1.62304,-0.9083 1.38243,-5.13724 -0.38553,-6.77572 -2.07624,-1.9242 -2.60964,-6.23021 -1.00145,-8.08446 1.5333,-1.76791 1.52457,-1.91026 -0.23331,-3.80705 -1.22275,-1.31937 -1.5171,-2.42053 -1.87709,-7.02233 -0.34572,-4.41942 -0.68693,-5.76656 -1.79367,-7.08186 -0.97042,-1.15327 -1.55444,-2.97387 -2.01408,-6.27852 -0.90694,-6.52068 -0.8234,-7.77738 0.62587,-9.41483 2.73793,-3.09345 3.00028,-4.6898 2.33069,-14.18201 -0.77691,-11.01347 -1.0599,-12.52627 -2.53677,-13.56071 -0.92551,-0.64825 -1.31053,-1.92168 -1.73902,-5.75155 -0.49168,-4.39469 -0.42635,-5.12911 0.61297,-6.89063 1.37608,-2.33226 1.27172,-4.15589 -0.23782,-4.15589 -0.68644,0 -1.16213,0.53444 -1.30418,1.46527 -0.12299,0.8059 -0.62127,1.90467 -1.10728,2.44171 -0.573,0.63316 -0.88366,2.24261 -0.88366,4.57803 0,2.84132 -0.25274,3.83032 -1.19729,4.68512 -1.48933,1.34783 -1.7625,6.88439 -0.33966,6.88439 1.81468,0 1.80269,4.92798 -0.0137,5.625 -1.35988,0.52183 -1.10254,5.26169 0.35335,6.50826 0.65851,0.56383 1.19728,1.47801 1.19728,2.03149 0,0.5535 0.44818,1.50158 0.99595,2.10685 0.80638,0.89105 0.98629,2.32424 0.94525,7.53017 -0.0659,8.36209 -0.009,7.92627 -1.04321,7.92627 -0.70414,0 -0.89796,0.82247 -0.89796,3.81044 0,2.90398 -0.28482,4.17254 -1.19729,5.33254 -1.49172,1.89642 -1.60416,6.55254 -0.22011,9.11561 1.17502,2.17599 1.15943,5.74556 -0.0601,13.76877 -1.19152,7.83864 -1.15332,9.46111 0.27801,11.80872 0.98758,1.61978 1.19544,3.02014 1.19729,8.06639 0.002,5.19136 0.15921,6.1943 1.04986,6.69341 1.44622,0.81043 1.42414,6.71303 -0.0311,8.32108 -1.3098,1.44731 -1.29662,2.52203 0.0311,2.53869 0.57619,0.007 2.19253,0.53284 3.59186,1.16802 l 2.54423,1.15487 v 4.51908 4.51909 h -20.58912 c -23.34487,0 -21.31585,0.51953 -21.31585,-5.45802 v -3.56416 l 2.74353,-1.17602 c 1.50893,-0.6468 3.12526,-1.17601 3.59185,-1.17601 1.21283,0 1.047,-1.35692 -0.34895,-2.8553 -1.7589,-1.88796 -1.61476,-5.75468 0.29932,-8.02943 1.38298,-1.64359 1.4966,-2.24365 1.4966,-7.90401 0,-4.45908 0.2391,-6.44151 0.87893,-7.28744 1.00873,-1.33367 1.18225,-4.87627 0.34649,-7.07445 -0.31377,-0.8253 -0.75501,-3.53673 -0.98053,-6.0254 -0.34714,-3.83084 -0.27035,-4.52485 0.50069,-4.52485 1.8604,0 2.19851,-4.70491 0.45171,-6.28575 -1.70792,-1.54564 -1.69979,-7.17028 0.013,-8.99346 l 1.21027,-1.28828 -1.21027,-1.53862 c -0.67529,-0.85849 -1.21028,-2.4378 -1.21028,-3.5728 0,-1.22975 -0.59184,-2.83637 -1.4966,-4.06271 -1.35483,-1.83636 -1.49661,-2.58029 -1.49661,-7.85272 0,-5.25243 0.1393,-5.99032 1.41895,-7.51639 3.42832,-4.0885 3.96883,-5.95772 3.96883,-13.7251 0,-6.46663 -0.13739,-7.43618 -1.25515,-8.85717 -0.94695,-1.20386 -1.336,-2.77533 -1.58444,-6.39995 -0.29299,-4.27466 -0.18762,-4.99589 0.95583,-6.54249 1.496,-2.02346 1.66974,-4.07126 0.38716,-4.56343 -0.62889,-0.24133 -0.89797,-1.22229 -0.89797,-3.27375 0,-1.61103 -0.25718,-2.92916 -0.57151,-2.92916 -0.67792,0 -1.03909,2.12593 -1.51326,8.9076 -0.43002,6.14998 -0.90077,7.09943 -3.75926,7.58192 -1.2307,0.20774 -3.08652,0.7581 -4.12404,1.22304 -1.03752,0.46495 -2.03487,0.84535 -2.21634,0.84535 -0.18147,0 -0.41015,-1.68368 -0.50817,-3.74151 -0.13564,-2.84749 -0.39279,-3.74152 -1.07619,-3.74152 -0.67433,0 -0.94292,0.86545 -1.07848,3.47511 l -0.18052,3.47511 -2.5105,-0.18258 c -2.11685,-0.15394 -2.56488,-0.41724 -2.85735,-1.67918 -0.78419,-3.38369 -2.01235,-5.38778 -3.30178,-5.38778 -1.02612,0 -1.54911,0.72395 -2.59481,3.59186 -1.2949,3.55139 -1.33592,3.59185 -3.64219,3.59185 h -2.33253 l -0.17954,-3.3949 c -0.25652,-4.85064 -1.67614,-5.08962 -1.67614,-0.28217 0,1.98352 -0.22378,3.74471 -0.49728,3.91375 -0.85258,0.52692 -8.61603,-2.38275 -9.46863,-3.54875 -0.4453,-0.60899 -0.8262,-2.20068 -0.84644,-3.53707 -0.0202,-1.3364 -0.39411,-4.31554 -0.83084,-6.62031 -0.70803,-3.73654 -0.80133,-3.91716 -0.86117,-1.66733 -0.0497,1.86679 -0.37859,2.68986 -1.26441,3.16394 -0.65851,0.35242 -1.19729,1.17006 -1.19729,1.81698 0,0.64693 0.53878,1.715 1.19729,2.37351 1.01036,1.01037 1.19728,1.99547 1.19728,6.30998 0,4.23791 -0.21286,5.40062 -1.24408,6.79542 -1.14512,1.54886 -1.22846,2.34455 -1.04763,10.00302 l 0.19646,8.3203 2.29956,3.43682 2.29956,3.43683 -0.20431,6.33406 c -0.17016,5.27535 -0.37942,6.43191 -1.25193,6.9195 -0.75094,0.41965 -1.04763,1.33331 -1.04763,3.22626 0,1.93846 -0.34532,2.96255 -1.29837,3.85045 -1.11258,1.03652 -1.20008,1.42537 -0.61148,2.71722 0.3778,0.82917 0.96206,1.50758 1.29838,1.50758 0.34208,0 0.61147,1.45054 0.61147,3.29253 0,2.49435 -0.29025,3.58279 -1.19728,4.48982 -1.72016,1.72016 -1.64005,5.5464 0.14088,6.7289 1.2922,0.85798 1.3116,1.00958 0.56505,4.41317 -1.82599,8.32475 -1.94338,10.54905 -0.68462,12.97172 0.93887,1.80701 1.17597,3.4666 1.17597,8.23133 0,5.1698 0.16013,6.12812 1.19729,7.16527 0.8678,0.8678 1.19728,1.99547 1.19728,4.09771 0,2.14016 -0.31384,3.18445 -1.19728,3.98396 -1.87367,1.69564 -1.4528,2.31173 2.39969,3.51273 l 3.58673,1.11815 v 4.71861 4.71861 H 69.23368 48.58052 v -4.67089 -4.67087 l 3.14288,-1.11666 c 1.72858,-0.61416 3.3184,-1.3812 3.53294,-1.70453 0.21453,-0.32332 -0.2569,-1.28559 -1.04763,-2.13835 -1.89817,-2.04709 -1.897,-5.03802 0.003,-7.52897 1.2833,-1.68249 1.46309,-2.61366 1.64627,-8.52605 0.16814,-5.42711 0.40754,-6.86007 1.31303,-7.85919 1.05567,-1.16486 1.06402,-1.49622 0.17875,-7.09517 -1.72542,-10.9126 -1.78611,-13.39708 -0.42587,-17.43488 1.5498,-4.60068 1.55929,-6.73839 0.0376,-8.49288 -0.87121,-1.00451 -1.19729,-2.23973 -1.19729,-4.53548 0,-2.49195 -0.31452,-3.5288 -1.4966,-4.93362 -1.37694,-1.63639 -1.49661,-2.2549 -1.49661,-7.73517 0,-5.48972 0.11723,-6.09287 1.49588,-7.69593 0.82273,-0.95666 1.4962,-2.20133 1.4966,-2.76594 4e-4,-0.56461 0.53951,-1.31491 1.19802,-1.66733 1.60707,-0.86008 1.60707,-4.37865 0,-6.42171 -1.56682,-1.99189 -1.56682,-4.7126 0,-5.55113 0.9072,-0.48553 1.19728,-1.25345 1.19728,-3.1696 0,-1.88049 -0.30695,-2.72052 -1.19728,-3.27654 -0.99203,-0.61953 -1.19729,-1.39605 -1.19729,-4.52947 0,-3.25984 -0.20654,-3.97578 -1.4966,-5.18774 -0.82314,-0.77329 -1.49661,-2.0325 -1.49661,-2.79823 0,-0.83847 -0.35718,-1.39226 -0.89796,-1.39226 -1.23195,0 -1.18121,3.21018 0.0671,4.2462 0.81777,0.67869 0.90183,1.62652 0.55068,6.20939 -0.34569,4.51176 -0.64724,5.65655 -1.81882,6.90504 -1.11757,1.19093 -1.47909,2.41362 -1.77005,5.98642 -0.2011,2.4694 -0.66981,7.12551 -1.04159,10.34691 -0.51219,4.4381 -0.50684,6.02621 0.0221,6.55514 0.38392,0.38391 0.69804,1.14995 0.69804,1.70229 0,0.55234 0.43214,1.3629 0.96032,1.80125 1.66191,1.37926 1.93529,3.15044 1.44645,9.37126 -0.3891,4.95149 -0.70834,6.2964 -1.76343,7.4289 -1.4826,1.59139 -1.63796,2.19822 -2.11867,8.27569 -0.2879,3.63973 -0.62657,4.75904 -1.81542,5.99993 l -1.4615,1.52548 1.18826,1.78242 c 1.46595,2.19898 1.20638,6.39396 -0.51311,8.2925 -1.14994,1.26968 -1.9897,4.79383 -1.48002,6.21107 0.14801,0.41157 0.65074,0.74831 1.11719,0.74831 1.28812,0 1.31315,-0.14521 -1.90241,11.03436 -0.88188,3.06603 -0.91071,3.8023 -0.21097,5.38778 0.80196,1.8171 1.00954,6.07769 0.59248,12.16073 -0.15861,2.31342 0.0462,3.4295 0.7775,4.23763 0.54606,0.60338 0.99283,1.82532 0.99283,2.71542 0,2.03797 -1.5291,5.77039 -2.36402,5.77039 -1.46795,0 -0.4724,1.73523 1.20719,2.10413 1.01,0.22184 1.93398,0.71468 2.05328,1.0952 0.60797,1.93919 0.68519,8.1497 0.10851,8.72639 -0.75538,0.75538 -40.26801,0.93165 -40.73151,0.1817 z m 38.41402,-5.03851 c -0.1652,-2.25211 -0.377,-2.55904 -2.06584,-2.99379 -1.03497,-0.26643 -2.01743,-0.83797 -2.18325,-1.27008 -0.5329,-1.38872 0.28628,-4.02037 1.44438,-4.64017 1.4452,-0.77345 1.49439,-4.00759 0.098,-6.44075 -0.91266,-1.5902 -0.95035,-2.38785 -0.34097,-7.21564 0.58941,-4.66959 0.5514,-5.76819 -0.27209,-7.86461 -1.00105,-2.54843 -0.9484,-3.11381 1.15009,-12.35011 0.61452,-2.70476 0.57431,-3.20576 -0.32985,-4.10992 -0.80603,-0.80604 -0.94953,-1.63227 -0.66071,-3.80415 0.47555,-3.57594 1.37117,-5.89729 2.43238,-6.30451 1.14319,-0.43869 1.10306,-4.80484 -0.0548,-5.96271 -1.342,-1.342 -1.08751,-3.41402 0.64091,-5.2181 1.35476,-1.41406 1.58981,-2.30281 1.9646,-7.42828 0.30702,-4.19859 0.68529,-6.01338 1.35656,-6.50819 1.71187,-1.26188 2.27261,-3.17154 2.37777,-8.09778 0.0757,-3.54786 -0.13633,-5.17395 -0.77245,-5.92312 -2.45543,-2.89176 -3.05187,-5.5459 -2.64572,-11.77318 0.68996,-10.57858 1.65884,-16.71252 2.79501,-17.69499 0.60931,-0.52689 1.31252,-2.5262 1.70171,-4.83817 0.822,-4.88309 0.84172,-4.47615 -0.27072,-5.58859 -0.97072,-0.97072 -1.15667,-2.09729 -0.97159,-5.88624 0.0864,-1.76765 0.35139,-2.24491 1.24667,-2.24491 1.59148,0 1.91938,-4.65772 0.60187,-8.54952 -1.05837,-3.12635 -0.89404,-7.77335 0.31024,-8.77282 0.38405,-0.31873 2.70666,-0.65978 5.16134,-0.75788 l 4.46307,-0.17837 v -6.88439 -6.88438 l -12.27217,-0.17515 c -6.74969,-0.0963 -13.11618,-0.0227 -14.14777,0.16366 l -1.8756,0.3388 -0.75709,6.79256 c -0.68148,6.11422 -0.65857,6.9332 0.22934,8.20088 1.3394,1.91226 1.24009,4.49202 -0.25369,6.58984 -0.68206,0.95787 -1.52897,3.55865 -1.88202,5.77952 -0.40084,2.5215 -1.10417,4.54991 -1.87282,5.40124 -1.44849,1.60428 -1.66865,5.32989 -0.36289,6.14083 0.64072,0.39792 0.8345,1.58473 0.74,4.53222 -0.0989,3.08321 0.11849,4.30653 0.95381,5.36847 0.92235,1.17258 1.00752,1.91881 0.57769,5.06179 -0.57163,4.17987 -0.8243,4.7716 -2.03744,4.7716 -1.10214,0 -1.09198,0.45482 0.0353,1.58213 0.64362,0.64363 0.89609,2.19991 0.89137,5.49468 -0.01,6.94797 -0.4666,8.92525 -2.15933,9.3501 -0.78427,0.19684 -1.42594,0.69697 -1.42594,1.1114 0,0.41444 -0.49504,1.17739 -1.10009,1.69545 -0.78422,0.67147 -1.31461,2.51167 -1.84719,6.40886 -0.69424,5.08018 -0.66807,5.56738 0.3699,6.88695 1.01522,1.29064 1.073,2.06248 0.63422,8.47206 -0.40334,5.89179 -0.33245,7.28147 0.43088,8.44645 1.59943,2.44104 0.95531,7.40772 -1.53192,11.81244 -0.37617,0.66617 -0.56829,5.2015 -0.48921,11.54855 0.12305,9.87576 0.0591,10.54782 -1.16139,12.19858 -0.71039,0.96085 -1.29162,2.58182 -1.29162,3.60216 0,4.09619 -1.34133,10.49661 -2.45224,11.70136 -1.42083,1.54083 -1.58559,5.94793 -0.24165,6.46365 1.09314,0.41947 1.20109,3.59471 0.14966,4.40184 -0.41157,0.31594 -2.49933,1.20739 -4.63948,1.98099 -4.42133,1.59819 -4.76728,1.93294 -4.77997,4.62522 l -0.009,1.94559 h 18.29301 18.29301 z m 161.63343,0.0366 -0.18409,-2.47274 -4.48981,-1.6396 c -4.48577,-1.63811 -4.48998,-1.64173 -4.66912,-4.01442 -0.12006,-1.59029 0.12715,-2.62918 0.7483,-3.14468 1.41012,-1.1703 1.11451,-3.72645 -0.65116,-5.63064 -1.40067,-1.51056 -1.62432,-2.3595 -1.98259,-7.5256 -0.33399,-4.81607 -0.65621,-6.17686 -1.86342,-7.86953 -1.42071,-1.99201 -1.45961,-2.34177 -1.45961,-13.12144 0,-9.70995 -0.13386,-11.27207 -1.08609,-12.67478 -1.65501,-2.43795 -2.01263,-7.70698 -0.67661,-9.96868 1.00622,-1.70338 1.02736,-2.30982 0.29519,-8.46653 -0.71272,-5.99322 -0.69445,-6.73581 0.18977,-7.71286 0.75596,-0.83533 0.97842,-2.3312 0.97842,-6.5793 v -5.49816 l -2.99321,-2.9775 c -2.53125,-2.51796 -2.99375,-3.32518 -2.99668,-5.23026 -0.002,-1.23902 -0.26569,-3.85408 -0.58619,-5.81125 -0.47449,-2.8976 -0.41826,-3.74021 0.30279,-4.53696 1.12398,-1.24198 1.12542,-2.18704 0.004,-2.81445 -0.57679,-0.3228 -1.01579,-1.94113 -1.27077,-4.68461 -0.32162,-3.46051 -0.22015,-4.33204 0.5819,-4.99767 0.71892,-0.59666 0.97144,-1.84672 0.97144,-4.80901 0,-2.59274 0.30961,-4.41212 0.87893,-5.16482 1.31253,-1.73532 1.09787,-3.90095 -0.55798,-5.62929 -1.08221,-1.12958 -1.58279,-2.49332 -1.8798,-5.12121 -0.22823,-2.01937 -1.02103,-4.6491 -1.81754,-6.02883 -1.65132,-2.86043 -1.77227,-4.5293 -0.47207,-6.51364 0.7791,-1.18907 0.86858,-2.51199 0.52091,-7.70207 -0.23087,-3.44652 -0.64408,-6.6298 -0.91825,-7.07394 -0.39511,-0.64021 -3.38675,-0.80752 -14.43925,-0.80752 h -13.94085 v 6.88438 6.88439 l 5.08846,0.29932 5.08846,0.29932 0.17601,3.99699 c 0.11633,2.64164 -0.14384,4.7625 -0.76723,6.25449 -1.22963,2.94292 -0.69048,7.40847 0.89446,7.40847 1.32627,0 1.79201,1.16298 1.79201,4.47473 0,1.74188 -0.29192,2.6929 -0.89797,2.92546 -0.68889,0.26436 -0.89796,1.40096 -0.89796,4.88177 0,4.13814 0.1394,4.66638 1.58494,6.00606 1.50287,1.39282 1.62466,1.94891 2.35203,10.74006 0.4219,5.09915 0.94095,9.81898 1.15345,10.48851 0.43628,1.37458 -1.16271,6.08391 -2.86628,8.44172 -0.99871,1.38226 -1.07959,2.20387 -0.69763,7.08649 0.34246,4.37768 0.67875,5.75278 1.62172,6.6313 1.33711,1.2457 2.17464,4.77421 2.21348,9.32526 0.0205,2.40713 0.34363,3.39811 1.52267,4.67032 1.81603,1.95953 1.93048,4.45357 0.28539,6.21936 -1.45138,1.55787 -1.15918,3.34091 0.94969,5.79515 1.23854,1.44138 1.45882,2.31643 1.45882,5.79512 0,3.24302 -0.18724,4.09738 -0.89797,4.09738 -0.96798,0 -1.23883,1.5146 -0.36718,2.05331 0.29193,0.18042 0.70921,1.34122 0.9273,2.57956 0.21809,1.23833 0.81601,3.55205 1.32871,5.14159 0.85983,2.66574 0.85096,3.10277 -0.11428,5.63022 -0.85127,2.22903 -0.98216,3.87589 -0.70167,8.82898 0.29819,5.26558 0.19663,6.31474 -0.75116,7.75956 -1.28288,1.95564 -0.86924,4.27576 1.11629,6.26129 0.70206,0.70206 1.25588,2.02688 1.25588,3.00424 0,1.48684 -0.29103,1.81151 -1.94559,2.17046 -2.33161,0.50584 -2.82229,1.14878 -2.83438,3.71387 l -0.009,1.94559 h 18.29302 18.29301 z m -117.34006,-14.01344 0.17792,-2.41807 -3.47045,-1.23535 c -3.24112,-1.15372 -3.48226,-1.37176 -3.64915,-3.29963 -0.12797,-1.47827 0.16942,-2.37932 1.04762,-3.17408 1.55457,-1.40687 1.56603,-3.59607 0.029,-5.55003 -1.01252,-1.28721 -1.19728,-2.42856 -1.19728,-7.39611 0,-5.12684 -0.19171,-6.23457 -1.5071,-8.70848 -1.2504,-2.35168 -1.40718,-3.14729 -0.92049,-4.67115 0.32263,-1.01018 0.74772,-3.31834 0.94464,-5.12923 0.19691,-1.81089 0.48156,-3.89866 0.63256,-4.63948 0.18152,-0.89053 -0.0119,-1.34694 -0.57077,-1.34694 -1.17696,0 -1.57373,-1.34324 -1.56171,-5.28709 0.009,-2.82781 0.258,-3.62814 1.49661,-4.80301 1.9045,-1.80649 1.90049,-4.09328 -0.0111,-6.31602 -1.88843,-2.19583 -1.88825,-3.57683 5.9e-4,-5.614 1.02437,-1.10473 1.49661,-2.29884 1.49661,-3.78431 0,-1.26384 0.50007,-2.80603 1.19728,-3.6924 1.71558,-2.181 1.75111,-10.83539 0.052,-12.66887 -2.57251,-2.77611 -4.24238,-6.98208 -4.24238,-10.6858 0,-5.34859 1.28012,-14.36406 2.19246,-15.44086 0.48315,-0.57025 0.80076,-2.43548 0.80076,-4.70272 0,-3.13474 -0.24809,-4.05246 -1.49661,-5.53624 -0.96732,-1.1496 -1.49661,-2.51348 -1.49661,-3.85651 0,-1.44747 0.45407,-2.49872 1.49661,-3.46491 1.12478,-1.04241 1.49661,-1.99329 1.49661,-3.82726 0,-1.34215 -0.26586,-2.60456 -0.59078,-2.80538 -0.32493,-0.20081 -0.99551,-1.7657 -1.49019,-3.47752 -1.18841,-4.11249 -0.57158,-6.62938 1.68991,-6.89545 l 1.62509,-0.1912 -0.41228,-5.4959 c -0.62109,-8.27961 -0.71533,-8.48912 -3.81878,-8.48912 -1.54922,0 -3.13417,0.41383 -3.90488,1.01956 -0.89333,0.7021 -2.67697,1.0749 -5.72833,1.19729 l -4.43107,0.17772 -0.16721,7.95753 c -0.13331,6.34386 -0.34592,8.02611 -1.04845,8.2957 -1.79916,0.6904 -3.8728,6.06802 -3.8728,10.04343 0,2.98894 -0.24279,3.96893 -1.19728,4.83274 -1.55368,1.40605 -1.55368,4.47391 0,6.44909 0.89725,1.14068 1.19728,2.42856 1.19728,5.13945 0,2.80377 0.23244,3.74742 1.03347,4.1957 0.80191,0.44877 1.08526,1.6041 1.26465,5.15663 0.2148,4.25351 0.14149,4.60174 -1.03346,4.90899 -1.57622,0.41219 -1.59082,0.90762 -0.0674,2.28632 0.93345,0.84477 1.19728,1.8438 1.19728,4.53364 0,3.99508 -0.39392,5.34396 -1.56065,5.34396 -0.45865,0 -0.83392,0.36234 -0.83392,0.80518 0,0.44285 -0.53878,1.29277 -1.19728,1.88871 -1.04037,0.94152 -1.19729,1.8438 -1.19729,6.88439 0,5.04058 0.15692,5.94286 1.19729,6.88438 0.95164,0.86123 1.19728,1.8438 1.19728,4.78914 0,3.01647 0.23582,3.9177 1.268,4.84602 1.122,1.0091 1.22989,1.58844 0.93703,5.03158 -0.18202,2.14015 -0.79625,4.8146 -1.36495,5.94324 -0.93242,1.85046 -0.96048,2.61499 -0.28562,7.78235 1.92533,14.74221 1.89451,13.93304 0.62364,16.37462 -0.94926,1.82371 -1.1781,3.46269 -1.1781,8.43787 0,5.41425 -0.14742,6.30794 -1.19728,7.25806 -1.5679,1.41892 -1.55397,4.49401 0.0286,6.31875 0.7878,0.90835 1.1622,2.05866 1.04762,3.21879 -0.15032,1.52209 -0.55393,1.92517 -2.57286,2.5695 -1.31702,0.42033 -2.866,0.93024 -3.4422,1.13314 -0.78301,0.27573 -1.04762,1.03391 -1.04762,3.00175 v 2.63286 l 18.10893,-0.15845 18.10893,-0.15843 0.17792,-2.41808 z m 73.63891,0.20621 c 0.15863,-1.90862 -0.0466,-2.32962 -1.49661,-3.07078 -0.92423,-0.47239 -2.55619,-1.0475 -3.62658,-1.27801 -2.63695,-0.56787 -3.20261,-2.73021 -1.36458,-5.21628 1.79139,-2.42298 1.91214,-4.39979 0.38717,-6.3377 -1.06195,-1.34949 -1.31536,-2.67792 -1.56625,-8.21034 -0.21097,-4.652 -0.61112,-7.20692 -1.35558,-8.65521 -0.88316,-1.71812 -0.96151,-2.60101 -0.4781,-5.38778 0.31799,-1.83311 0.87442,-6.16151 1.23651,-9.61866 0.60344,-5.76139 0.55716,-6.58538 -0.5548,-9.8776 -1.61189,-4.77238 -1.60136,-7.92195 0.0323,-9.6609 0.98195,-1.04523 1.29145,-2.17452 1.34694,-4.9146 0.0482,-2.3819 0.39955,-3.92448 1.06309,-4.66794 1.00983,-1.13145 1.38769,-4.11326 1.20579,-9.51535 -0.0879,-2.61046 -0.4244,-3.37385 -2.49618,-5.66314 -2.25943,-2.49664 -2.39457,-2.85848 -2.39457,-6.41145 0,-2.11122 0.26299,-3.76547 0.59864,-3.76547 0.32925,0 0.59864,-0.40409 0.59864,-0.89797 0,-0.49388 0.33674,-0.90692 0.7483,-0.91788 0.41157,-0.0109 0.14218,-0.52556 -0.59864,-1.14358 -1.8772,-1.56602 -1.94435,-7.49383 -0.11129,-9.82419 0.89805,-1.14168 1.26786,-2.56852 1.35353,-5.22227 0.0906,-2.80765 0.38097,-3.84375 1.25639,-4.48388 1.42275,-1.04034 1.41263,-4.73451 -0.0173,-6.31458 -0.61482,-0.67937 -1.15372,-2.7483 -1.41995,-5.45149 -0.44605,-4.52891 -2.2545,-9.0282 -3.87942,-9.65175 -0.76924,-0.29518 -0.92347,-1.70724 -0.92347,-8.45483 v -8.10045 h -4.53258 c -3.23077,0 -4.79048,-0.25791 -5.43054,-0.89797 -0.56919,-0.56919 -2.04392,-0.89796 -4.02781,-0.89796 h -3.12985 l -0.71857,4.96987 c -0.39521,2.73342 -0.71856,5.8314 -0.71856,6.88438 0,1.72815 0.17482,1.91452 1.79592,1.91452 h 1.79593 v 3.77676 c 0,2.39401 -0.32179,4.2022 -0.87893,4.9388 -1.23677,1.63516 -1.25194,8.04643 -0.019,8.04643 0.69633,0 0.89796,0.79004 0.89796,3.51855 0,2.39729 -0.28616,3.75604 -0.89796,4.2638 -0.66574,0.55251 -0.89797,2.02568 -0.89797,5.69635 0,3.84875 0.19994,5.02783 0.89797,5.29569 0.74641,0.28643 0.89796,1.96111 0.89796,9.92321 0,8.51505 -0.13729,9.84204 -1.23647,11.95086 -0.68007,1.30473 -1.62293,2.69295 -2.09525,3.08495 -0.63531,0.52725 -0.85878,2.1879 -0.85878,6.38176 0,4.76257 0.19144,5.91241 1.19729,7.19113 0.71289,0.9063 1.19728,2.42856 1.19728,3.76264 0,1.26127 0.39247,2.56626 0.89797,2.98578 0.50646,0.42033 0.89796,1.72533 0.89796,2.99321 0,1.26788 -0.3915,2.57289 -0.89796,2.99321 -0.50647,0.42033 -0.89797,1.72533 -0.89797,2.99321 0,1.26789 0.3915,2.57289 0.89797,2.99322 0.65913,0.54702 0.89796,1.99953 0.89796,5.46107 0,3.79277 -0.17577,4.71585 -0.89796,4.71585 -1.10414,0 -1.10188,1.07411 0.012,5.6871 1.10504,4.57653 1.09257,8.65616 -0.031,10.14167 -0.64534,0.85321 -0.87893,2.8603 -0.87893,7.55196 0,5.48346 -0.16984,6.60584 -1.19728,7.91202 -1.55467,1.97644 -1.52325,4.83201 0.077,6.99644 1.77946,2.40685 1.17826,4.57651 -1.42336,5.13678 -3.82012,0.82268 -5.23869,1.92794 -5.23869,4.08168 0,1.08906 0.18347,2.16358 0.40771,2.38782 0.22424,0.22424 8.50796,0.33649 18.40826,0.24943 l 18.00053,-0.15827 z m -68.60999,-125.74792 0.18094,-3.14287 3.4422,-0.17954 3.44219,-0.17954 v 3.09639 c 0,2.5813 0.13896,2.98106 0.83534,2.40312 0.45944,-0.3813 1.01001,-1.62437 1.2235,-2.76237 0.48772,-2.59974 2.27326,-3.10442 7.5913,-2.14566 0.20415,0.0368 0.72338,1.32484 1.15384,2.86231 0.62685,2.23888 0.87232,2.56663 1.23301,1.64627 0.24769,-0.63202 0.46928,-2.03809 0.49242,-3.12459 l 0.0421,-1.97547 3.4422,0.17954 3.44219,0.17954 0.29932,2.99321 c 0.29139,2.91388 0.34692,2.98817 2.09525,2.80291 0.98776,-0.10466 2.01293,-0.40248 2.27815,-0.66182 0.77993,-0.76262 2.72593,-15.73086 3.0912,-23.77701 0.0918,-2.02216 0.30498,-3.90789 0.47373,-4.1905 0.16875,-0.28261 0.48688,-2.53426 0.70697,-5.00366 0.22008,-2.4694 0.67383,-5.90411 1.00833,-7.63269 0.59255,-3.06215 0.66091,-3.14287 2.66098,-3.14287 h 2.05281 V 59.362951 c 0,-49.032724 -10e-4,-49.088668 -1.22293,-49.088668 -0.67262,0 -2.51893,1.212251 -4.10293,2.69389 l -2.87999,2.693891 H 105.6638 85.94567 L 83.30182,12.968173 C 80.33243,9.9425855 78.14249,9.4242535 77.611,11.621228 c -0.17922,0.74082 -0.2517,22.763373 -0.16107,48.939007 l 0.16479,47.592065 2.39457,0.29932 c 2.31171,0.28896 2.39993,0.38217 2.54959,2.69389 0.0853,1.31701 0.44694,4.1456 0.80373,6.28574 0.35679,2.14015 1.01349,7.52793 1.45933,11.97285 1.79079,17.85368 2.32369,21.87994 2.9839,22.54438 0.37923,0.38167 1.33934,0.81641 2.13358,0.9661 0.79424,0.14969 1.63203,0.30885 1.86177,0.35369 0.22973,0.0448 0.49912,-1.33277 0.59864,-3.06135 z M 85.471,61.009217 c -0.19724,-1.070073 -0.63377,-5.31295 -0.97005,-9.428616 -0.33629,-4.115666 -0.76391,-8.472924 -0.95028,-9.682795 -0.27952,-1.814689 -0.12137,-2.316151 0.90344,-2.864614 1.69612,-0.907737 1.57965,-3.224138 -0.25433,-5.058117 -0.84025,-0.84025 -1.51657,-2.230529 -1.54215,-3.170082 -0.025,-0.920413 -0.38907,-2.616339 -0.80894,-3.768726 -0.60964,-1.673234 -0.61435,-2.456974 -0.0234,-3.891175 0.40701,-0.987759 0.97849,-2.604094 1.26997,-3.591853 0.50632,-1.715856 0.69491,-1.80384 4.23003,-1.973391 3.47041,-0.166447 3.80095,-0.06426 5.32503,1.646267 l 1.62498,1.823729 h 11.5874 11.58741 l 0.68844,-1.510959 c 0.81123,-1.780471 2.20146,-2.222767 6.18746,-1.968526 l 2.93106,0.186953 1.27097,3.591853 c 0.89533,2.530302 1.13508,4.12263 0.81119,5.387781 -0.94497,3.691267 -1.07519,4.228826 -1.4139,5.836762 -0.19073,0.905447 -0.74573,1.646267 -1.23334,1.646267 -1.29875,0 -1.18717,4.138016 0.1377,5.106785 0.93486,0.683581 0.96066,1.264173 0.2956,6.651061 -0.40078,3.246153 -0.90204,8.39395 -1.11392,11.439542 l -0.38523,5.537441 h -5.4931 c -4.96786,0 -5.61757,-0.132485 -6.79475,-1.385527 -0.7159,-0.762042 -1.30163,-1.685783 -1.30163,-2.052763 0,-0.426089 -1.92287,-0.736677 -5.3204,-0.859381 -5.99422,-0.216481 -7.25109,-0.07521 -7.25109,0.814998 0,0.341017 -0.60613,1.259471 -1.34695,2.041011 -1.22448,1.291786 -1.84432,1.421919 -6.81776,1.431318 l -5.47082,0.01036 -0.35863,-1.945587 z m 10.87029,-1.197285 c 0.33802,-0.411566 0.70774,-1.421775 0.8216,-2.244908 l 0.20702,-1.496606 h 8.38099 8.38099 l 0.20703,1.496606 c 0.34717,2.509766 1.18807,2.993211 5.20641,2.993211 h 3.77022 l 0.34501,-4.040835 c 0.18975,-2.22246 0.57336,-6.195948 0.85246,-8.829974 0.42625,-4.022776 0.35472,-4.967128 -0.44702,-5.901431 -0.67226,-0.783416 -0.95447,-2.323986 -0.95447,-5.210382 0,-3.60767 0.14422,-4.134336 1.2052,-4.400979 1.83603,-0.461427 2.95999,-5.894596 1.97853,-9.564143 -0.70627,-2.640669 -0.8324,-2.759931 -2.91904,-2.759931 -1.71823,0 -2.47284,0.380974 -3.55722,1.795927 l -1.37636,1.795926 H 105.47462 92.50661 l -1.35262,-1.829514 c -1.14342,-1.546568 -1.68965,-1.801175 -3.53188,-1.646267 -1.97909,0.166417 -2.24093,0.403194 -2.85064,2.577818 -0.96543,3.443286 0.13091,8.762606 1.97254,9.570571 1.20967,0.530711 1.34695,1.012079 1.34695,4.723143 0,3.150368 -0.23488,4.30395 -0.98851,4.855018 -0.89359,0.653413 -0.92254,1.464442 -0.30144,8.446989 0.97753,10.989857 0.69336,10.418064 5.17764,10.418064 2.27157,0 3.99016,-0.294783 4.36264,-0.748303 z M 55.78851,138.91296 c 0.19931,-2.80088 0.71656,-5.14684 1.34695,-6.10893 1.60498,-2.44951 1.31281,-2.8856 -1.79848,-2.68443 -2.66471,0.1723 -2.84435,0.29316 -3.22554,2.17014 -0.26434,1.30162 -0.0442,2.9712 0.63785,4.83716 0.57935,1.58501 0.91412,3.71756 0.75442,4.80569 -0.24457,1.66637 -0.12056,1.92443 0.83706,1.74181 0.94643,-0.18049 1.17534,-0.93336 1.44774,-4.76144 z m 102.18087,2.91297 c -0.18679,-1.21707 0.14057,-2.92235 0.87428,-4.55413 0.90878,-2.02115 1.05752,-3.09958 0.66052,-4.78914 -0.46787,-1.99125 -0.71249,-2.19714 -2.81704,-2.3711 -1.26756,-0.10477 -2.51857,0.0299 -2.78002,0.29932 -0.26144,0.2694 0.0662,1.56738 0.72821,2.88439 0.75614,1.50443 1.18742,3.50726 1.16017,5.38778 -0.0541,3.7298 0.35898,5.08846 1.54693,5.08846 0.70639,0 0.85485,-0.46072 0.62695,-1.94558 z m -75.3321,-10.00054 c -0.12954,-3.58985 -1.13874,-5.04797 -2.53053,-3.65618 -0.86211,0.86211 1.26679,7.04618 2.47815,7.19854 0.0996,0.0125 0.12314,-1.58154 0.0524,-3.54236 z m 47.94511,1.19441 c 0.6652,-1.3039 1.20945,-2.90433 1.20945,-3.55652 0,-1.37582 -1.06295,-2.2289 -1.82622,-1.46563 -0.61949,0.6195 -1.50112,7.39287 -0.96226,7.39287 0.20327,0 0.91383,-1.06682 1.57903,-2.37072 z M 72.82657,109.49924 74.906,108.1523 74.913,60.410575 74.92,12.668852 h -5.66604 c -5.05335,0 -5.73532,-0.129465 -6.3068,-1.197284 -0.35242,-0.658507 -1.03537,-1.197285 -1.51767,-1.197285 -0.67036,0 -0.8769,0.826379 -0.8769,3.508468 v 3.508469 l -2.98525,0.353558 c -2.63957,0.312618 -3.41643,0.772864 -6.70876,3.974561 -3.70445,3.602467 -3.74167,3.621001 -7.27024,3.621001 h -3.5467 l -8.0031,7.546135 -8.00311,7.546134 v 3.697148 3.69715 l -3.59185,3.554373 c -1.97552,1.954908 -3.58574,3.966891 -3.57826,4.471079 0.007,0.504183 0.88299,1.344006 1.94558,1.866268 1.7963,0.882865 1.94461,1.187712 2.11153,4.340156 l 0.17954,3.39059 h -2.12513 c -2.31495,0 -2.83702,1.164432 -1.32084,2.946075 0.77239,0.907631 3.17509,4.411916 17.47672,25.489434 9.56299,14.093778 9.99567,14.666738 11.07612,14.666738 0.54474,0 1.61166,0.53878 2.37092,1.19728 1.26635,1.0983 2.23974,1.19729 11.77352,1.19729 9.76274,0 10.51915,-0.0817 12.47249,-1.34695 z m 90.09467,0.14966 c 0.82314,-0.64386 1.95934,-1.17665 2.52491,-1.18397 0.57628,-0.007 2.04443,-1.52642 3.33991,-3.45551 1.27139,-1.8932 3.52033,-5.19322 4.99764,-7.33336 2.19881,-3.185355 11.93003,-17.491948 19.74328,-29.026066 1.84679,-2.726283 1.73618,-3.300621 -0.63565,-3.300621 -0.92802,0 -1.93885,-0.336736 -2.24631,-0.748302 -0.46505,-0.622529 -0.58633,-3.004867 -0.26106,-5.127886 0.0412,-0.268623 1.15239,-1.094025 2.4694,-1.834228 1.31701,-0.740204 2.39457,-1.539062 2.39457,-1.775244 0,-0.236177 -1.61634,-2.028883 -3.59186,-3.983791 -3.58788,-3.550446 -3.59185,-3.558306 -3.59185,-7.109809 v -3.555435 l -8.05674,-7.987169 -8.05675,-7.987169 h -3.48358 c -3.91191,0 -4.74398,-0.440444 -8.99971,-4.763823 -2.38197,-2.419844 -3.21601,-2.898798 -5.0479,-2.898798 -3.12907,0 -3.47114,-0.398741 -3.47114,-4.046233 0,-2.581241 -0.19799,-3.257203 -0.95401,-3.257203 -0.52471,0 -1.09245,0.529372 -1.26164,1.176383 -0.27485,1.051022 -0.92277,1.194558 -6.08004,1.346945 l -5.77241,0.170562 -0.14663,47.592062 -0.14664,47.592065 2.24189,1.32044 c 2.0715,1.22009 3.01531,1.32145 12.4188,1.33364 9.2022,0.0119 10.32026,-0.0989 11.67352,-1.15748 z"
        style={{fill: this.strokeColor}}
>
</path>
</g>
</svg>
        );
    }
}

interface IQuadInternalStructureDiagramSVGProps {
    bgColor?: string;
    strokeColor?: string;

    yLoc?: number;
    xLoc?: number;

    width?: number;
}

interface IQuadInternalStructureDiagramSVGState {
}