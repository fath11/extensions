// Name: Pen Plus 3D Addon
// ID: penP3D
// Description: 3d Rendering for pen+
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    //for those who use the version from pen-group's site
    alert("Shaded Stamps must be ran unsandboxed!");
    throw new Error("Shaded Stamps must run unsandboxed");
  }

  const defaultShaders = {
    "VHS Shader":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_vertex","id":"?PVz0-*+bo_6k4L{)ZoM","x":32,"y":103}]}},"dynamicDat":{"dynamic_variables":[],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x + sin(look.y*10. + u_timer)/50.*onOff(4.,4.,.3)*(1.+cos(u_timer*80.))*window;\n\thighp float vShift = 0.4*onOff(2.,3.,.9)*(sin(u_timer)*sin(u_timer*20.) + \n\t\t\t\t\t\t\t\t\t\t (0.5 + 0.1*sin(u_timer*200.)*cos(u_timer)));\n\tlook.y = mod(look.y + vShift, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\nvoid fragment()\n{\n\thighp vec2 uv = gl_FragCoord.xy / u_res.xy;\n\tuv = screenDistort(uv);\n\thighp vec3 video = getVideo(uv);\n\thighp float vigAmt = 3.+.3*sin(u_timer + 5.*cos(u_timer*5.));\n\thighp float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));\n\t\n\tvideo += stripes(uv);\n\tvideo *= vignette;\n\tvideo *= (12.+mod(uv.y*30.+u_timer,1.))/13.;\n\t\n\tgl_FragColor = vec4(video,1.0);\n}//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],0.001,1);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":true,"savedVarState":{}},"vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x + sin(look.y*10. + u_timer)/50.*onOff(4.,4.,.3)*(1.+cos(u_timer*80.))*window;\n\thighp float vShift = 0.4*onOff(2.,3.,.9)*(sin(u_timer)*sin(u_timer*20.) + \n\t\t\t\t\t\t\t\t\t\t (0.5 + 0.1*sin(u_timer*200.)*cos(u_timer)));\n\tlook.y = mod(look.y + vShift, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],0.001,1);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x + sin(look.y*10. + u_timer)/50.*onOff(4.,4.,.3)*(1.+cos(u_timer*80.))*window;\n\thighp float vShift = 0.4*onOff(2.,3.,.9)*(sin(u_timer)*sin(u_timer*20.) + \n\t\t\t\t\t\t\t\t\t\t (0.5 + 0.1*sin(u_timer*200.)*cos(u_timer)));\n\tlook.y = mod(look.y + vShift, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\n//Vertex Shader\nvoid main()\n{\n\thighp vec2 uv = gl_FragCoord.xy / u_res.xy;\n\tuv = screenDistort(uv);\n\thighp vec3 video = getVideo(uv);\n\thighp float vigAmt = 3.+.3*sin(u_timer + 5.*cos(u_timer*5.));\n\thighp float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));\n\t\n\tvideo += stripes(uv);\n\tvideo *= vignette;\n\tvideo *= (12.+mod(uv.y*30.+u_timer,1.))/13.;\n\t\n\tgl_FragColor = vec4(video,1.0);\n}"},"modifyDate":1719608205668},
    "Chromatic Abberation":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"vector_vec4","id":"hi!OC7DVc~5?.OXDU|ko","inputs":{"x":{"shadow":{"type":"number_reporter","id":"9O-P7kIKoU.LixBT/l[e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"e7|L-ERJzRy|eACO0S4i","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"CKgqVzMp(o)n0nsPMZ5c","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_sub","id":"Y%[pf*;Sv0a_/^xW~V|9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"o~jgaaC,ki]W9FlKt+p,","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":",A,*3$};|[sZ-5/gUXM3"}},"B":{"shadow":{"type":"number_reporter","id":"=?j^@zE7t-%T2R@W|N+Z","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"TQ!/Yt]sgV)1T*R6@5,x","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"^:EHm;n#Pr-:^7SiK*c{","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":"tPm8xX^*otW|U%75(tLq","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"|iv-+;S$F^0X8:Ul}{Zo","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"y":{"shadow":{"type":"number_reporter","id":"IpHiBR$n,=_]EGXv1k2O","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"b!1?6%ZVC#Q!o@~h22G,","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"osDSfdS|=DU{FIDpO*Rj","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"663mi,Z7e~B{jyT8fR./"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"F,G2{EjQ9_CTFCYsVYG!","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"z":{"shadow":{"type":"number_reporter","id":":S^T#n5S7RaTy;SmYSic","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"Oa])=7Q}n{q!/LTsUvOy","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"fgzi|m^+kL@m8u2Jr9C*","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_add","id":"AkT@`DQwcX[%{AK)}x_7","inputs":{"A":{"shadow":{"type":"number_reporter","id":"b{!Vr[_:f+58+(Z9Ta}c","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"6I{F[QI$188frlCMgtCw"}},"B":{"shadow":{"type":"number_reporter","id":"K=a3h_@RQnk}XXbpe##t","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":";;M}s_cp.tIC3VLX@d|.","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"EwEHzt}Ar8kx];qOur/K","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":";d(Yx0UP$ks`U(ccnjG2","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"ib@1beMe7,|ii`]:|4c/","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"w":{"shadow":{"type":"number_reporter","id":"#F@]@S|$aN,{m2.oe9SZ","fields":{"NUMBER":1}},"block":{"type":"operators_div","id":"FEdu,oMfK)BavO*SMm43","inputs":{"A":{"shadow":{"type":"number_reporter","id":"l-[YTGkgi$@UQ(J+xHL0","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":"uqXh78[NnN=C)d,}ifrR","inputs":{"A":{"shadow":{"type":"number_reporter","id":"}JL~]xmO3H;PZXvfS*sw","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":",^sABt+bLauKEG41mIrj","inputs":{"A":{"shadow":{"type":"number_reporter","id":"8+kJ8,w?1vJ~T2cD#gi`","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"$a_cQ)%IW=ZL0jo5pW2t","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"JE(td.x@$oI-+d?f~~dN","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_sub","id":"%?Tq7LhXXElYh*j[A{Z}","inputs":{"A":{"shadow":{"type":"number_reporter","id":"_!J_*$qu|4-ic.KZe*G6","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"PuA+yvUm^ts~n170]#%R"}},"B":{"shadow":{"type":"number_reporter","id":"$-8x0v90Q?iOA5y/g@6M","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"ciQhsBcKR348{uOyT4eo","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"vevm1qZ,Ry3.YUogFhkf","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":".h1kf[cn^Vv14z`3?f1U","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"~y6My{4z;:-.xn=:TDL^","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"YBLKnlgc+%z1f(coP~`e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":";Z6)[cuIBL0r6;.oiZ4Q","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"d)FfeY$s^A]P5m35a^Y:","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"WHzw69W0Kz8k|uh..JP1"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"~+,fxsYcjh*z=NW/[Elj","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"YBLKnlgc+%z1f(coP~`e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"-VE+I:3I47Q%dNfW$kw%","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"=[((/Xt$W`Uu~jnrQ/.W","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_add","id":"wnluS3FWR@]=-x,0#Chu","inputs":{"A":{"shadow":{"type":"number_reporter","id":"b{!Vr[_:f+58+(Z9Ta}c","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"_7ak9AbG-!egkZnS:eI]"}},"B":{"shadow":{"type":"number_reporter","id":"K=a3h_@RQnk}XXbpe##t","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"8Ml-%Q^u32};PRT1l=AP","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"J4]V?bTI+K_?5GLR^0io","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":"IRIW]P;m#4c,ICC|Sj.x","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"_W1m%lY(n[xBD{y78dFw","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"-zX55sA{|[]N)J?6ttxu","fields":{"NUMBER":3}}}}}}}}}},"next":{"block":{"type":"controls_if","id":"c4iHphXMW}8,_TA,8|vT","inputs":{"condition":{"block":{"type":"operators_more","id":"w$~dmHSW/ms/tZ%*4]H9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"n%;LB{MtZm585hovk:+s","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"}pnqru:6(Bz%.sf*fg[C","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"qD:gIBa`.gKSdA^D?!13","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"D~R[ixZ!8v4EaOJqN=j#"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"V8~{W)mKpH_0kkwh?}iu","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"1W-kN,*@:zmx-,qurv($","fields":{"NUMBER":0}}}}}},"true":{"block":{"type":"looks_mulBlending","id":"L87I]~9DK?d;;%D*]2Rt"}}}}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"uniform seperation","id":"uniform_seperation","type":"float"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"uniform seperation"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\n\n\ngl_FragColor = vec4(texture2D(u_skin,(v_texCoord - vec2(seperation,float(0)))).x,texture2D(u_skin,v_texCoord).y,texture2D(u_skin,(v_texCoord + vec2(seperation,float(0)))).z,(((texture2D(u_skin,(v_texCoord - vec2(seperation,float(0)))).w + texture2D(u_skin,v_texCoord).w) + texture2D(u_skin,(v_texCoord + vec2(seperation,float(0)))).w) / float(3)));\nif (texture2D(u_skin,v_texCoord).w > float(0)) {\n  gl_FragColor.rgb *= vec3(gl_FragColor.a);\n}\n}//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":false,"savedVarState":{"seperation":"0.01"}},"fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_FragColor = v_color;\n\n\ngl_FragColor = vec4(texture2D(u_skin,(v_texCoord - vec2(seperation,float(0)))).x,texture2D(u_skin,v_texCoord).y,texture2D(u_skin,(v_texCoord + vec2(seperation,float(0)))).z,(((texture2D(u_skin,(v_texCoord - vec2(seperation,float(0)))).w + texture2D(u_skin,v_texCoord).w) + texture2D(u_skin,(v_texCoord + vec2(seperation,float(0)))).w) / float(3)));\nif (texture2D(u_skin,v_texCoord).w > float(0)) {\n  gl_FragColor.rgb *= vec3(gl_FragColor.a);\n}\n}","vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}"},"modifyDate":1719608823276},
    "Posterization":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"vector_vec4","id":"hi!OC7DVc~5?.OXDU|ko","inputs":{"x":{"shadow":{"type":"number_reporter","id":"9O-P7kIKoU.LixBT/l[e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"e7|L-ERJzRy|eACO0S4i","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"CKgqVzMp(o)n0nsPMZ5c","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_sub","id":"Y%[pf*;Sv0a_/^xW~V|9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"o~jgaaC,ki]W9FlKt+p,","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":",A,*3$};|[sZ-5/gUXM3"}},"B":{"shadow":{"type":"number_reporter","id":"=?j^@zE7t-%T2R@W|N+Z","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"TQ!/Yt]sgV)1T*R6@5,x","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"^:EHm;n#Pr-:^7SiK*c{","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":"tPm8xX^*otW|U%75(tLq","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"|iv-+;S$F^0X8:Ul}{Zo","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"y":{"shadow":{"type":"number_reporter","id":"IpHiBR$n,=_]EGXv1k2O","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"b!1?6%ZVC#Q!o@~h22G,","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"osDSfdS|=DU{FIDpO*Rj","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"663mi,Z7e~B{jyT8fR./"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"F,G2{EjQ9_CTFCYsVYG!","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"z":{"shadow":{"type":"number_reporter","id":":S^T#n5S7RaTy;SmYSic","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"Oa])=7Q}n{q!/LTsUvOy","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"fgzi|m^+kL@m8u2Jr9C*","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_add","id":"AkT@`DQwcX[%{AK)}x_7","inputs":{"A":{"shadow":{"type":"number_reporter","id":"b{!Vr[_:f+58+(Z9Ta}c","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"6I{F[QI$188frlCMgtCw"}},"B":{"shadow":{"type":"number_reporter","id":"K=a3h_@RQnk}XXbpe##t","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":";;M}s_cp.tIC3VLX@d|.","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"EwEHzt}Ar8kx];qOur/K","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":";d(Yx0UP$ks`U(ccnjG2","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"ib@1beMe7,|ii`]:|4c/","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"w":{"shadow":{"type":"number_reporter","id":"#F@]@S|$aN,{m2.oe9SZ","fields":{"NUMBER":1}},"block":{"type":"operators_div","id":"FEdu,oMfK)BavO*SMm43","inputs":{"A":{"shadow":{"type":"number_reporter","id":"l-[YTGkgi$@UQ(J+xHL0","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":"uqXh78[NnN=C)d,}ifrR","inputs":{"A":{"shadow":{"type":"number_reporter","id":"}JL~]xmO3H;PZXvfS*sw","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":",^sABt+bLauKEG41mIrj","inputs":{"A":{"shadow":{"type":"number_reporter","id":"8+kJ8,w?1vJ~T2cD#gi`","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"$a_cQ)%IW=ZL0jo5pW2t","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"JE(td.x@$oI-+d?f~~dN","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_sub","id":"%?Tq7LhXXElYh*j[A{Z}","inputs":{"A":{"shadow":{"type":"number_reporter","id":"_!J_*$qu|4-ic.KZe*G6","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"PuA+yvUm^ts~n170]#%R"}},"B":{"shadow":{"type":"number_reporter","id":"$-8x0v90Q?iOA5y/g@6M","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"ciQhsBcKR348{uOyT4eo","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"vevm1qZ,Ry3.YUogFhkf","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":".h1kf[cn^Vv14z`3?f1U","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"~y6My{4z;:-.xn=:TDL^","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"YBLKnlgc+%z1f(coP~`e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":";Z6)[cuIBL0r6;.oiZ4Q","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"d)FfeY$s^A]P5m35a^Y:","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"WHzw69W0Kz8k|uh..JP1"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"~+,fxsYcjh*z=NW/[Elj","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"YBLKnlgc+%z1f(coP~`e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"-VE+I:3I47Q%dNfW$kw%","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"=[((/Xt$W`Uu~jnrQ/.W","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_add","id":"wnluS3FWR@]=-x,0#Chu","inputs":{"A":{"shadow":{"type":"number_reporter","id":"b{!Vr[_:f+58+(Z9Ta}c","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"_7ak9AbG-!egkZnS:eI]"}},"B":{"shadow":{"type":"number_reporter","id":"K=a3h_@RQnk}XXbpe##t","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"8Ml-%Q^u32};PRT1l=AP","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]P~_,:8xJw$JK$?6{;]c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"J4]V?bTI+K_?5GLR^0io","extraState":{"variableData":{"type":"float","mainText":"uniform seperation"}}}},"y":{"shadow":{"type":"number_reporter","id":"IRIW]P;m#4c,ICC|Sj.x","fields":{"NUMBER":0}}}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"_W1m%lY(n[xBD{y78dFw","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"-zX55sA{|[]N)J?6ttxu","fields":{"NUMBER":3}}}}}}}}}},"next":{"block":{"type":"controls_if","id":"c4iHphXMW}8,_TA,8|vT","inputs":{"condition":{"block":{"type":"operators_more","id":"w$~dmHSW/ms/tZ%*4]H9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"n%;LB{MtZm585hovk:+s","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"}pnqru:6(Bz%.sf*fg[C","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"qD:gIBa`.gKSdA^D?!13","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"D~R[ixZ!8v4EaOJqN=j#"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"V8~{W)mKpH_0kkwh?}iu","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"1W-kN,*@:zmx-,qurv($","fields":{"NUMBER":0}}}}}},"true":{"block":{"type":"looks_mulBlending","id":"L87I]~9DK?d;;%D*]2Rt"}}}}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"uniform seperation","id":"uniform_seperation","type":"float"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"uniform seperation"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float Colors;\n\nhighp vec3 rgb2hsv(highp vec3 c)\n{\n    highp vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n    highp vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n    highp vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n    highp float d = q.x - min(q.w, q.y);\n    highp float e = 1.0e-10;\n    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\n\n//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\n\ngl_FragColor = texture2D(u_skin,v_texCoord);\nhighp vec3 awesome = rgb2hsv(gl_FragColor.xyz * 1.0);\nhighp float blend = 100.0 / Colors;\ngl_FragColor = HSVToRGB(\n  awesome.x * 360.0,\n  ceil(awesome.y * Colors) * blend,\n  ceil(awesome.z * Colors) * blend,\n  gl_FragColor.w);\n  gl_FragColor.xyz *= gl_FragColor.w;\n}\n\n//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":true,"savedVarState":{"u_skin":"CS:S","Colors":"4"}},"fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float Colors;\n\nhighp vec3 rgb2hsv(highp vec3 c)\n{\n    highp vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n    highp vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n    highp vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n    highp float d = q.x - min(q.w, q.y);\n    highp float e = 1.0e-10;\n    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\n\n//Fragment Shader\n\n\n//Vertex Shader\nvoid main() {\ngl_FragColor = v_color;\n\ngl_FragColor = texture2D(u_skin,v_texCoord);\nhighp vec3 awesome = rgb2hsv(gl_FragColor.xyz * 1.0);\nhighp float blend = 100.0 / Colors;\ngl_FragColor = HSVToRGB(\n  awesome.x * 360.0,\n  ceil(awesome.y * Colors) * blend,\n  ceil(awesome.z * Colors) * blend,\n  gl_FragColor.w);\n  gl_FragColor.xyz *= gl_FragColor.w;\n}","vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float Colors;\n\nhighp vec3 rgb2hsv(highp vec3 c)\n{\n    highp vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n    highp vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n    highp vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n    highp float d = q.x - min(q.w, q.y);\n    highp float e = 1.0e-10;\n    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\n\n//Fragment Shader\n\n\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}"},"modifyDate":1719608847650},
    "Glitchy":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"variables_variable_set","id":"tQlC1zj{{pT-LolK:3Ze","fields":{"VAR":{"id":"hat_direction"}},"inputs":{"VALUE":{"shadow":{"type":"vec2_reporter","id":"sCe`eQqors.-u%~g]w$I","fields":{"x":0,"y":0}},"block":{"type":"operators_mul","id":"!88-`hd4O2%V*T]OZs)i","inputs":{"A":{"shadow":{"type":"number_reporter","id":"u8z;e_tm75b$_YA_IA8P","fields":{"NUMBER":0.015}}},"B":{"shadow":{"type":"number_reporter","id":"HJ,uSjn-0WyAVUKVJy,a","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"JX0UE-fZTm!y+`F!^Z]B","inputs":{"x":{"shadow":{"type":"number_reporter","id":"+Ng6up1f@$V)`bEW`_re","fields":{"NUMBER":0}},"block":{"type":"operators_arith","id":"VY,hk~Xv6VG2o;tb;NvY","fields":{"arithmatic":"sin"},"inputs":{"A":{"shadow":{"type":"number_reporter","id":"UV,|Wdn5KMfIk!VHT4u%","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":"`WU4ZDC]9=I{PAOyD4y@","inputs":{"A":{"shadow":{"type":"number_reporter","id":"lve[6gWV?oLq,k!8gI74","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"Hw48Xy4HaGPh@/HJ:o|i","inputs":{"A":{"shadow":{"type":"number_reporter","id":"2sX;3k0IXr%`Kdu1#(~P","fields":{"NUMBER":10}}},"B":{"shadow":{"type":"number_reporter","id":"lwL1s9@b!6*1Pr2$d[57","fields":{"NUMBER":0}},"block":{"type":"sensing_timer","id":":k$Tr.#@L97ISEYO[_yd"}}}}},"B":{"shadow":{"type":"number_reporter","id":"LR8!|.H/C4cCCYRHz7Q,","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"XIztbE/VUO.V*1t#t}~v","inputs":{"A":{"shadow":{"type":"number_reporter","id":"v03A?d@(l@hi8eB?:g{W","fields":{"NUMBER":20}}},"B":{"shadow":{"type":"number_reporter","id":"_A6;rjImV]vrw}I)BStr","fields":{"NUMBER":0}},"block":{"type":"operators_mod","id":"|%rtSzGkQ)e[Ohx0:wp_","inputs":{"A":{"shadow":{"type":"number_reporter","id":".RXSs;+w.OcIUn[!DWA;","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"8QLRI#eZC%oJ|AmBD6eW","inputs":{"A":{"shadow":{"type":"number_reporter","id":"5=?$:sOx)/Q|gn9T+7`[","fields":{"NUMBER":0.05}},"block":{"type":"sensing_screenU","id":"u!HLZ=$F|(8sH=KN4f65"}},"B":{"shadow":{"type":"number_reporter","id":"y_ga)1WxUI_Z^/OO4;P$","fields":{"NUMBER":500}}}}}},"B":{"shadow":{"type":"number_reporter","id":"ZINv8_B[DZV#g=`zy1-[","fields":{"NUMBER":1}}}}}}}}}}}}}}},"y":{"shadow":{"type":"number_reporter","id":"(SI_`w~K5;gbkJjxZ;6g","fields":{"NUMBER":0}},"block":{"type":"operators_arith","id":"Ps[)[eNjp{$+b2pc|t+1","fields":{"arithmatic":"cos"},"inputs":{"A":{"shadow":{"type":"number_reporter","id":"a}35ZWrRFV`aLu^]r_Y,","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":";zLCf2oQKVM-_z(81!j`","inputs":{"A":{"shadow":{"type":"number_reporter","id":"6Vg1[!Zw%!].`EXq{;*5","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"HFBLF.fcO:vaVxd3_rvu","inputs":{"A":{"shadow":{"type":"number_reporter","id":"?}3G^-cht5!V~4kJsOqo","fields":{"NUMBER":10}}},"B":{"shadow":{"type":"number_reporter","id":"05v:lv*0R+[;e~8~!3(#","fields":{"NUMBER":0}},"block":{"type":"sensing_timer","id":"iQU:E6NDj$v3D#^g7[ly"}}}}},"B":{"shadow":{"type":"number_reporter","id":"LR8!|.H/C4cCCYRHz7Q,","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"#O%S,7^}CO97VrMqysLq","inputs":{"A":{"shadow":{"type":"number_reporter","id":"aon,B7(-xh:xOpFnx*k2","fields":{"NUMBER":20}}},"B":{"shadow":{"type":"number_reporter","id":"CL)eY*pRx{F:Z2321MK@","fields":{"NUMBER":0}},"block":{"type":"operators_mod","id":",d8[L[YzCY+;rA,2Wq8e","inputs":{"A":{"shadow":{"type":"number_reporter","id":".RXSs;+w.OcIUn[!DWA;","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"NKfLef+)a.y+wc#A41Av","inputs":{"A":{"shadow":{"type":"number_reporter","id":"5=?$:sOx)/Q|gn9T+7`[","fields":{"NUMBER":0.05}},"block":{"type":"sensing_screenV","id":"p$L89Q3@c9a.PR1KtrMI"}},"B":{"shadow":{"type":"number_reporter","id":"HJ,uSjn-0WyAVUKVJy,a","fields":{"NUMBER":500}}}}}},"B":{"shadow":{"type":"number_reporter","id":"o:_kI0K6gpd=BM~S]#^)","fields":{"NUMBER":1}}}}}}}}}}}}}}}}}}}}}},"next":{"block":{"type":"variables_variable_set","id":"fdawqjJfxX#mR[W{p}kW","fields":{"VAR":{"id":"hat_UV"}},"inputs":{"VALUE":{"shadow":{"type":"vec2_reporter","id":"X+tq(+ki*A1LQQ*brc*{","fields":{"x":0,"y":0}},"block":{"type":"looks_pixUV","id":",A,*3$};|[sZ-5/gUXM3"}}},"next":{"block":{"type":"variables_variable_set","id":"o}$.fg}{~O!9vvM(i4nO","fields":{"VAR":{"id":"hat_UV"}},"inputs":{"VALUE":{"shadow":{"type":"vec2_reporter","id":"hZ0m4S+;uuyHyGxpuOhx","fields":{"x":0,"y":0}},"block":{"type":"operators_add","id":"`vgoK!,Jy}8wM/+Hf+yh","inputs":{"A":{"shadow":{"type":"number_reporter","id":"6Vg1[!Zw%!].`EXq{;*5","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"9lwZ0+}S*3@[ChJFp-du","extraState":{"variableData":{"type":"vec2","mainText":"hat UV"}}}},"B":{"shadow":{"type":"number_reporter","id":"LR8!|.H/C4cCCYRHz7Q,","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"nM(k@EcCiGBCD3_-8?(4","inputs":{"A":{"shadow":{"type":"number_reporter","id":"ta@ELnQ:a`%Ke8tS5Vs8","fields":{"NUMBER":0.005}}},"B":{"shadow":{"type":"number_reporter","id":"$f$w!k(}sJmnx_).NwRN","fields":{"NUMBER":0}},"block":{"type":"vector_vec2","id":"z`NqUGJ=G9c=h-*6[xzB","inputs":{"x":{"shadow":{"type":"number_reporter","id":"+Ng6up1f@$V)`bEW`_re","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"PVE6]6zQY:yuC;6mKS0q","inputs":{"A":{"shadow":{"type":"number_reporter","id":"v:~5=+J9IJ#7di7jMZEy","fields":{"NUMBER":0.05}},"block":{"type":"operators_arith","id":"G_|y$gpP/XJG+DK:(O{R","fields":{"arithmatic":"cos"},"inputs":{"A":{"shadow":{"type":"number_reporter","id":"UV,|Wdn5KMfIk!VHT4u%","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"O*u?D62ZE@d}f/z?J4l}","inputs":{"A":{"shadow":{"type":"number_reporter","id":"#J0!9/QE%YA%*nTICVrS","fields":{"NUMBER":0.05}},"block":{"type":"operators_add","id":"UYQ?M@xRu(JvfGth3DE|","inputs":{"A":{"shadow":{"type":"number_reporter","id":"6Vg1[!Zw%!].`EXq{;*5","fields":{"NUMBER":0}},"block":{"type":"sensing_screenV","id":"p`EAU!tW_V(`{n_Zp@;h"}},"B":{"shadow":{"type":"number_reporter","id":"WANY{KJmp:VSM5|-Mp-v","fields":{"NUMBER":0}},"block":{"type":"sensing_timer","id":"5QZuFEgb(}3/xMD{T)-h"}}}}},"B":{"shadow":{"type":"number_reporter","id":"I){p}_JwX|/3S~Dsl-{5","fields":{"NUMBER":200}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":":Ua3aT@X5q,2iUkx=tQf","fields":{"NUMBER":1}}}}}},"y":{"shadow":{"type":"number_reporter","id":"(SI_`w~K5;gbkJjxZ;6g","fields":{"NUMBER":0}},"block":{"type":"operators_arith","id":"}0/`U6]V]lWyuc?A16N?","fields":{"arithmatic":"cos"},"inputs":{"A":{"shadow":{"type":"number_reporter","id":"UV,|Wdn5KMfIk!VHT4u%","fields":{"NUMBER":0}},"block":{"type":"operators_add","id":"qj5)J$+Ls%@Tonc5jS)E","inputs":{"A":{"shadow":{"type":"number_reporter","id":"6Vg1[!Zw%!].`EXq{;*5","fields":{"NUMBER":0}},"block":{"type":"operators_pow","id":"39CE]5y}S6-](sIpa)Qv","inputs":{"A":{"shadow":{"type":"number_reporter","id":"O[B2Pt6Ul$zcMv:[AfFl","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"[H.k)15k=|lE4,G|G(ub","inputs":{"A":{"shadow":{"type":"number_reporter","id":"RB~mimLu61?Qlm8?UvUg","fields":{"NUMBER":0.05}},"block":{"type":"sensing_screenV","id":":Fbmn|m]`w!08+5ps*Uk"}},"B":{"shadow":{"type":"number_reporter","id":"7#?uLhQ1!44VR9k!bxZ/","fields":{"NUMBER":20}}}}}},"B":{"shadow":{"type":"number_reporter","id":"$=/2vq@z:1+u?nsZ5EB:","fields":{"NUMBER":2}}}}}},"B":{"shadow":{"type":"number_reporter","id":"/5O7am:Qe`RbYiUMPh5|","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"79{5H2^rzTbYDRTxGU5v","inputs":{"A":{"shadow":{"type":"number_reporter","id":"kRz[%%)0E-KUQ?KBhd-Z","fields":{"NUMBER":0.05}},"block":{"type":"sensing_timer","id":"Hr%UoY1;]@HEJaQTP;Vj"}},"B":{"shadow":{"type":"number_reporter","id":"?{5]o^G/R=zh3]#6+Jrn","fields":{"NUMBER":10}}}}}}}}}}}}}}}}}}}}}},"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"vector_vec4","id":"hi!OC7DVc~5?.OXDU|ko","inputs":{"x":{"shadow":{"type":"number_reporter","id":"9O-P7kIKoU.LixBT/l[e","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"e7|L-ERJzRy|eACO0S4i","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"CKgqVzMp(o)n0nsPMZ5c","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_sub","id":"Y%[pf*;Sv0a_/^xW~V|9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"o~jgaaC,ki]W9FlKt+p,","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"vJ8dXXHvZ?Yk8^tgH)|O","extraState":{"variableData":{"type":"vec2","mainText":"hat UV"}}}},"B":{"shadow":{"type":"number_reporter","id":"=?j^@zE7t-%T2R@W|N+Z","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"if1CVxRv-?Y,Jg+Wi_0C","extraState":{"variableData":{"type":"vec2","mainText":"hat direction"}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"|iv-+;S$F^0X8:Ul}{Zo","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"y":{"shadow":{"type":"number_reporter","id":"IpHiBR$n,=_]EGXv1k2O","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"b!1?6%ZVC#Q!o@~h22G,","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"osDSfdS|=DU{FIDpO*Rj","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"663mi,Z7e~B{jyT8fR./"},"block":{"type":"variables_variable_reporter","id":"gEntMaPSeKs|7XZjMRB2","extraState":{"variableData":{"type":"vec2","mainText":"hat UV"}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"F,G2{EjQ9_CTFCYsVYG!","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"z":{"shadow":{"type":"number_reporter","id":":S^T#n5S7RaTy;SmYSic","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"Oa])=7Q}n{q!/LTsUvOy","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"fgzi|m^+kL@m8u2Jr9C*","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_add","id":"AkT@`DQwcX[%{AK)}x_7","inputs":{"A":{"shadow":{"type":"number_reporter","id":"b{!Vr[_:f+58+(Z9Ta}c","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":".LaV9tT.0!zG,BB`0zyR","extraState":{"variableData":{"type":"vec2","mainText":"hat UV"}}}},"B":{"shadow":{"type":"number_reporter","id":"K=a3h_@RQnk}XXbpe##t","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"kVoN|2-^f|Dio2riEu^C","extraState":{"variableData":{"type":"vec2","mainText":"hat direction"}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"ib@1beMe7,|ii`]:|4c/","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"w":{"shadow":{"type":"number_reporter","id":"#F@]@S|$aN,{m2.oe9SZ","fields":{"NUMBER":1}},"block":{"type":"vector_getitem","id":"G{w=}5i:*g1qQlE%q%DA","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"f0:}a9J4ab5cfZ8T:+(v","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"variables_variable_reporter","id":"cTxrj1g/zH?`LlXO%]04","extraState":{"variableData":{"type":"vec2","mainText":"hat UV"}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"0;m+GL?+s.`IQ9mJ0l^(","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}}}}}},"next":{"block":{"type":"controls_if","id":"c4iHphXMW}8,_TA,8|vT","inputs":{"condition":{"block":{"type":"operators_more","id":"w$~dmHSW/ms/tZ%*4]H9","inputs":{"A":{"shadow":{"type":"number_reporter","id":"n%;LB{MtZm585hovk:+s","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":";L=gO_)y}9tWX=P@,eHB","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"Oz|z|k60MFo`_!9=V~SZ","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_sample_texture","id":"y@]nQ|TQZ|I)oQK-phCt","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"n?50-mvG1!M{S`Biw{2O","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"1W-kN,*@:zmx-,qurv($","fields":{"NUMBER":0}}}}}},"true":{"block":{"type":"looks_mulBlending","id":"L87I]~9DK?d;;%D*]2Rt"}}}}}}}}}}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"hat direction","id":"hat_direction","type":"vec2"},{"name":"hat UV","id":"hat_UV","type":"vec2"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"vec2","mainText":"hat direction"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"vec2","mainText":"hat UV"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\n//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\nhighp vec2 direction = vec2(1);\nhighp vec2 UV = vec2(1);\n\n\ndirection = vec2((float(0.015) * vec2(sin(((float(10) * u_timer) + (float(20) * mod(((gl_FragCoord.x / u_res.x) * float(500)),float(1))))),cos(((float(10) * u_timer) + (float(20) * mod(((gl_FragCoord.y / u_res.y) * float(500)),float(1))))))));\n\nUV = vec2(v_texCoord);\n\nUV = vec2((UV + (float(0.005) * vec2((cos((((gl_FragCoord.y / u_res.y) + u_timer) * float(200))) * float(1)),cos((pow(((gl_FragCoord.y / u_res.y) * float(20)), float(2)) + (u_timer * float(10))))))));\n\ngl_FragColor = vec4(texture2D(u_skin,(UV - direction)).x,texture2D(u_skin,UV).y,texture2D(u_skin,(UV + direction)).z,texture2D(u_skin,UV).w);\nif (texture2D(u_skin,v_texCoord).x > float(0)) {\n  gl_FragColor.rgb *= vec3(gl_FragColor.a);\n}\n}//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":false,"savedVarState":{"seperation":"0.01"}},"fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_FragColor = v_color;\nhighp vec2 direction = vec2(1);\nhighp vec2 UV = vec2(1);\n\n\ndirection = vec2((float(0.015) * vec2(sin(((float(10) * u_timer) + (float(20) * mod(((gl_FragCoord.x / u_res.x) * float(500)),float(1))))),cos(((float(10) * u_timer) + (float(20) * mod(((gl_FragCoord.y / u_res.y) * float(500)),float(1))))))));\n\nUV = vec2(v_texCoord);\n\nUV = vec2((UV + (float(0.005) * vec2((cos((((gl_FragCoord.y / u_res.y) + u_timer) * float(200))) * float(1)),cos((pow(((gl_FragCoord.y / u_res.y) * float(20)), float(2)) + (u_timer * float(10))))))));\n\ngl_FragColor = vec4(texture2D(u_skin,(UV - direction)).x,texture2D(u_skin,UV).y,texture2D(u_skin,(UV + direction)).z,texture2D(u_skin,UV).w);\nif (texture2D(u_skin,v_texCoord).x > float(0)) {\n  gl_FragColor.rgb *= vec3(gl_FragColor.a);\n}\n}","vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}"},"modifyDate":1719608897844},
    "Sepia":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"looks_sample_texture","id":"CKgqVzMp(o)n0nsPMZ5c","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"|iv-+;S$F^0X8:Ul}{Zo","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}},"next":{"block":{"type":"looks_setPixColor","id":".AKrH#pguMztk,f0xt*W","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"?EW;cY%h3+3n=y+pp)3g","fields":{"COLOUR":"#0000ff"}},"block":{"type":"vector_vec4","id":"i$OB!~KxzeFgT{W;-]PO","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]*~un9L+`lQyScM*/c6o","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"ad)3u)QrYQvRih_.kM#3","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"y":{"shadow":{"type":"number_reporter","id":"sfCfUMVJO/$;1:Vv])ID","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"u?!cJ2+w.`EYj:OLnq,O","inputs":{"A":{"shadow":{"type":"number_reporter","id":"`xi$mgrv@4xC*A29`v}V","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"wQsPQ{ej#T+Yws%bE9#+","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"B":{"shadow":{"type":"number_reporter","id":"$7]JJoF@xiIS[jO~@1;@","fields":{"NUMBER":0.75}}}}}},"z":{"shadow":{"type":"number_reporter","id":"H~L{AUY*o8ngRV*?-+bg","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"5X_)pEBK9oHjd6e.0h7H","inputs":{"A":{"shadow":{"type":"number_reporter","id":"`xi$mgrv@4xC*A29`v}V","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"H@OuXYj{vVS59uwIcV2#","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"B":{"shadow":{"type":"number_reporter","id":"vd=9)oc4o]0R`z[{E-G#","fields":{"NUMBER":0.5}}}}}},"w":{"shadow":{"type":"number_reporter","id":"[,e*O0MRLe7[q5pDfBP;","fields":{"NUMBER":1}},"block":{"type":"vector_getitem","id":"X.aXhqd9@~:u(CD;wO.y","fields":{"coordinate":"w"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"wcXB_uoMFw6?*!~~|SLM","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"`(F)lEDXnLpEH+M}*W~k"}}}}}}}}},"next":{"block":{"type":"looks_mulBlending","id":"L87I]~9DK?d;;%D*]2Rt"}}}}}}},{"type":"myblocks_customBlockDef","id":"+Wmf.?SKR9UDo`F9gD;j","x":95,"y":606,"fields":{"type":"highp float"},"inputs":{"name":{"shadow":{"type":"string_reporter","id":"dr!jNu)IZaSsyZ[s^;a{","fields":{"STRING":"get brightest color"}}},"code":{"block":{"type":"variables_variable_set","id":"5#fkaq/ZbfuS@7tuI:!P","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"aAmz96#~G]K@oOi.c8^E","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"em-33P;b=Tew)fpa%-wn"}}}}}},"next":{"block":{"type":"controls_if","id":"M6WK~@?(b:G[yhb?y4z1","inputs":{"condition":{"block":{"type":"operators_equalLess","id":"sQ@|KZCahz}7UNxt5k%5","inputs":{"A":{"shadow":{"type":"number_reporter","id":"E1dDTM.GmahDQx9n/NMZ","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"$kSM_Y~Sf3ncp9tEtOr*","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}},"B":{"shadow":{"type":"number_reporter","id":"^.@k3O~9Mgi5fCH:d2pX","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"ggU6szrv[I.@.m49o(74","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"Qm|CY:GQ!Ko0VA,ZqVCU"}}}}}}}},"true":{"block":{"type":"variables_variable_set","id":"4Tfqiqcor0/ZiqGia.-%","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"eQ(V:LHYZ+;tgsD5wEH0","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":",qp$wCq%WfZwPd,{]F~W"}}}}}}}}},"next":{"block":{"type":"controls_if","id":"3EY$/B`}gN1slke!@H{*","inputs":{"condition":{"block":{"type":"operators_equalLess","id":"gyW41b~}yNlu+!ygYqbA","inputs":{"A":{"shadow":{"type":"number_reporter","id":"E1dDTM.GmahDQx9n/NMZ","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"/tBiqNI8bKEjj^i~4O9n","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}},"B":{"shadow":{"type":"number_reporter","id":"^.@k3O~9Mgi5fCH:d2pX","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"1y~517{f~7wsIKFag.F8","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"BwE?u_arM(L~4Qs-),[2"}}}}}}}},"true":{"block":{"type":"variables_variable_set","id":"@%Ow_9Bm:+LE7(~1{PnN","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"ahRg{VY/x_dg4ff#{R|#","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"CMyCGvzws-ja(tCXP?_["}}}}}}}}},"next":{"block":{"type":"myblocks_customBlockReturn","id":"Va4cwV6:dDf,A.$5V,2N","inputs":{"return":{"shadow":{"type":"number_reporter","id":"R-N3qkSPJ-d?,)}:GMPX","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"5[(,/2rHiOMyxHS!K1sj","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}}}}}}}}}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"uniform seperation","id":"uniform_seperation","type":"float"},{"name":"hat brightest","id":"hat_brightest","type":"float"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"uniform seperation"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"hat brightest"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[{"type":"duplicate","of":"customBlockExecute_Reporter","tooltip":"Your custom block!","extraData":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\nhighp float brightest = float(1);\n\n\ngl_FragColor = texture2D(u_skin,v_texCoord);\ngl_FragColor = vec4(get_brightest_color(),(get_brightest_color() * float(0.75)),(get_brightest_color() * float(0.5)),gl_FragColor.w);\ngl_FragColor.rgb *= vec3(gl_FragColor.a);\n}\nhighp float get_brightest_color() {\nhighp float brightest = float(1);\n\n  brightest = float(gl_FragColor.x);\n\n  if (brightest <= gl_FragColor.y) {\n    brightest = float(gl_FragColor.y);\n\n  }\n  if (brightest <= gl_FragColor.z) {\n    brightest = float(gl_FragColor.z);\n\n  }\n  return float(brightest);\n\n}\n//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":false,"savedVarState":{"seperation":"0.01"}},"fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\n\nhighp float get_brightest_color() {\nhighp float brightest = float(1);\n\n  brightest = float(gl_FragColor.x);\n\n  if (brightest <= gl_FragColor.y) {\n    brightest = float(gl_FragColor.y);\n\n  }\n  if (brightest <= gl_FragColor.z) {\n    brightest = float(gl_FragColor.z);\n\n  }\n  return float(brightest);\n\n}\n//Vertex Shader\nvoid main() {\ngl_FragColor = v_color;\nhighp float brightest = float(1);\n\n\ngl_FragColor = texture2D(u_skin,v_texCoord);\ngl_FragColor = vec4(get_brightest_color(),(get_brightest_color() * float(0.75)),(get_brightest_color() * float(0.5)),gl_FragColor.w);\ngl_FragColor.rgb *= vec3(gl_FragColor.a);\n}","vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float seperation;\n\n//Fragment Shader\n\nhighp float get_brightest_color() {\nhighp float brightest = float(1);\n\n  brightest = float(vec4(1).x);\n\n  if (brightest <= vec4(1).y) {\n    brightest = float(vec4(1).y);\n\n  }\n  if (brightest <= vec4(1).z) {\n    brightest = float(vec4(1).z);\n\n  }\n  return float(brightest);\n\n}\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}"},"modifyDate":1719608909368},
    "Stable VHS Shader":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"looks_sample_texture","id":"CKgqVzMp(o)n0nsPMZ5c","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"|iv-+;S$F^0X8:Ul}{Zo","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}},"next":{"block":{"type":"looks_setPixColor","id":".AKrH#pguMztk,f0xt*W","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"?EW;cY%h3+3n=y+pp)3g","fields":{"COLOUR":"#0000ff"}},"block":{"type":"vector_vec4","id":"i$OB!~KxzeFgT{W;-]PO","inputs":{"x":{"shadow":{"type":"number_reporter","id":"]*~un9L+`lQyScM*/c6o","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"ad)3u)QrYQvRih_.kM#3","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"y":{"shadow":{"type":"number_reporter","id":"sfCfUMVJO/$;1:Vv])ID","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"u?!cJ2+w.`EYj:OLnq,O","inputs":{"A":{"shadow":{"type":"number_reporter","id":"`xi$mgrv@4xC*A29`v}V","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"wQsPQ{ej#T+Yws%bE9#+","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"B":{"shadow":{"type":"number_reporter","id":"$7]JJoF@xiIS[jO~@1;@","fields":{"NUMBER":0.75}}}}}},"z":{"shadow":{"type":"number_reporter","id":"H~L{AUY*o8ngRV*?-+bg","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"5X_)pEBK9oHjd6e.0h7H","inputs":{"A":{"shadow":{"type":"number_reporter","id":"`xi$mgrv@4xC*A29`v}V","fields":{"NUMBER":0}},"block":{"type":"myblocks_customBlockExecute_Reporter","id":"H@OuXYj{vVS59uwIcV2#","extraState":{"customBlockData":{"type":"highp float","mainText":"get brightest color","scriptTarget":"get_brightest_color","arguments":[]}}}},"B":{"shadow":{"type":"number_reporter","id":"vd=9)oc4o]0R`z[{E-G#","fields":{"NUMBER":0.5}}}}}},"w":{"shadow":{"type":"number_reporter","id":"[,e*O0MRLe7[q5pDfBP;","fields":{"NUMBER":1}}}}}}}}}}}},{"type":"myblocks_customBlockDef","id":"+Wmf.?SKR9UDo`F9gD;j","x":95,"y":606,"fields":{"type":"highp float"},"inputs":{"name":{"shadow":{"type":"string_reporter","id":"dr!jNu)IZaSsyZ[s^;a{","fields":{"STRING":"get brightest color"}}},"code":{"block":{"type":"variables_variable_set","id":"5#fkaq/ZbfuS@7tuI:!P","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"aAmz96#~G]K@oOi.c8^E","fields":{"coordinate":"x"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"em-33P;b=Tew)fpa%-wn"}}}}}},"next":{"block":{"type":"controls_if","id":"M6WK~@?(b:G[yhb?y4z1","inputs":{"condition":{"block":{"type":"operators_equalLess","id":"sQ@|KZCahz}7UNxt5k%5","inputs":{"A":{"shadow":{"type":"number_reporter","id":"E1dDTM.GmahDQx9n/NMZ","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"$kSM_Y~Sf3ncp9tEtOr*","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}},"B":{"shadow":{"type":"number_reporter","id":"^.@k3O~9Mgi5fCH:d2pX","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"ggU6szrv[I.@.m49o(74","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"Qm|CY:GQ!Ko0VA,ZqVCU"}}}}}}}},"true":{"block":{"type":"variables_variable_set","id":"4Tfqiqcor0/ZiqGia.-%","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"eQ(V:LHYZ+;tgsD5wEH0","fields":{"coordinate":"y"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":",qp$wCq%WfZwPd,{]F~W"}}}}}}}}},"next":{"block":{"type":"controls_if","id":"3EY$/B`}gN1slke!@H{*","inputs":{"condition":{"block":{"type":"operators_equalLess","id":"gyW41b~}yNlu+!ygYqbA","inputs":{"A":{"shadow":{"type":"number_reporter","id":"E1dDTM.GmahDQx9n/NMZ","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"/tBiqNI8bKEjj^i~4O9n","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}},"B":{"shadow":{"type":"number_reporter","id":"^.@k3O~9Mgi5fCH:d2pX","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"1y~517{f~7wsIKFag.F8","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"BwE?u_arM(L~4Qs-),[2"}}}}}}}},"true":{"block":{"type":"variables_variable_set","id":"@%Ow_9Bm:+LE7(~1{PnN","fields":{"VAR":{"id":"hat_brightest"}},"inputs":{"VALUE":{"shadow":{"type":"number_reporter","id":"Tlz3lBvu;m~o|8$uITZF","fields":{"NUMBER":0}},"block":{"type":"vector_getitem","id":"ahRg{VY/x_dg4ff#{R|#","fields":{"coordinate":"z"},"inputs":{"vector":{"shadow":{"type":"vec4_reporter","id":"dd5]$`kIk8ZE*BNbJLZh","fields":{"x":0,"y":0,"z":0,"w":0}},"block":{"type":"looks_getPixColor","id":"CMyCGvzws-ja(tCXP?_["}}}}}}}}},"next":{"block":{"type":"myblocks_customBlockReturn","id":"Va4cwV6:dDf,A.$5V,2N","inputs":{"return":{"shadow":{"type":"number_reporter","id":"R-N3qkSPJ-d?,)}:GMPX","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"5[(,/2rHiOMyxHS!K1sj","extraState":{"variableData":{"type":"float","mainText":"hat brightest"}}}}}}}}}}}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"uniform seperation","id":"uniform_seperation","type":"float"},{"name":"hat brightest","id":"hat_brightest","type":"float"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"uniform seperation"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"hat brightest"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x;\n\tlook.y = mod(look.y, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\nvoid fragment()\n{\n\thighp vec2 uv = gl_FragCoord.xy / u_res.xy;\n\tuv = screenDistort(uv);\n\thighp vec3 video = getVideo(uv);\n\thighp float vigAmt = 3.+.3*sin(u_timer + 5.*cos(u_timer*5.));\n\thighp float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));\n\t\n\tvideo += stripes(uv);\n\tvideo *= vignette;\n\tvideo *= (12.+mod(uv.y*30.+u_timer,1.))/13.;\n\t\n\tgl_FragColor = vec4(video,1.0);\n}//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],0.001,1);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":true,"savedVarState":{}},"vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x;\n\tlook.y = mod(look.y, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * u_transform[0][1],0.001,1);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\nuniform sampler2D u_skin;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n/* License CC BY-NC-SA 4.0 Deed */\n/* https://creativecommons.org/licenses/by-nc-sa/4.0/ */\n\nhighp float onOff(highp float a, highp float b, highp float c)\n{\n\treturn step(c, sin(u_timer + a*cos(u_timer*b)));\n}\n\nhighp float ramp(highp float y, highp float start, highp float end)\n{\n\thighp float inside = step(start,y) - step(end,y);\n\thighp float fact = (y-start)/(end-start)*inside;\n\treturn (1.-fact) * inside;\n\t\n}\n\nhighp float stripes(highp vec2 uv)\n{\n\treturn ramp(mod(uv.y*4. + u_timer/2.+sin(u_timer + sin(u_timer*0.63)),1.),0.5,0.6);\n}\n\nhighp vec3 getVideo(highp vec2 uv)\n{\n\thighp vec2 look = uv;\n\thighp float window = 1./(1.+20.*(look.y-mod(u_timer/4.,1.))*(look.y-mod(u_timer/4.,1.)));\n\tlook.x = look.x;\n\tlook.y = mod(look.y, 1.);\n\thighp vec3 video = vec3(texture2D(u_skin,look));\n\treturn video;\n}\n\nhighp vec2 screenDistort(highp vec2 uv)\n{\n\tuv -= vec2(.5,.5);\n\tuv = uv*1.2*(1./1.2+2.*uv.x*uv.x*uv.y*uv.y);\n\tuv += vec2(.5,.5);\n\treturn uv;\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n\n//Vertex Shader\nvoid main()\n{\n\thighp vec2 uv = gl_FragCoord.xy / u_res.xy;\n\tuv = screenDistort(uv);\n\thighp vec3 video = getVideo(uv);\n\thighp float vigAmt = 3.+.3*sin(u_timer + 5.*cos(u_timer*5.));\n\thighp float vignette = (1.-vigAmt*(uv.y-.5)*(uv.y-.5))*(1.-vigAmt*(uv.x-.5)*(uv.x-.5));\n\t\n\tvideo += stripes(uv);\n\tvideo *= vignette;\n\tvideo *= (12.+mod(uv.y*30.+u_timer,1.))/13.;\n\t\n\tgl_FragColor = vec4(video,1.0);\n}"},"modifyDate":1719608205824},
    "Pixelated":{"projectData":{"projectData":{"blockDat":{"blocks":{"languageVersion":0,"blocks":[{"type":"events_pixel","id":"qFL#_7Lh0;Ep18cW[2gg","x":27,"y":168,"next":{"block":{"type":"looks_setPixColor","id":"ooXL_(0AIAj1GwK6KFd_","inputs":{"COLOR":{"shadow":{"type":"color_reporter","id":"u0TR1$f#Zo/rt8rnhjm9","fields":{"COLOUR":"#0000ff"}},"block":{"type":"looks_sample_texture","id":"fgzi|m^+kL@m8u2Jr9C*","inputs":{"UV":{"shadow":{"type":"looks_pixUV","id":"h,[jj?{oGGKF?+c2=vn2"},"block":{"type":"operators_div","id":"TOn{:VO`;I6yG@;Q=D@W","inputs":{"A":{"shadow":{"type":"number_reporter","id":".!?]KL$xIoYZScTRiIKH","fields":{"NUMBER":0}},"block":{"type":"operators_arith","id":"nZkFND+Ir-:R0p0f2{Bn","fields":{"arithmatic":"floor"},"inputs":{"A":{"shadow":{"type":"number_reporter","id":"E)qhQB`#6;S5W^IZ-(f[","fields":{"NUMBER":0}},"block":{"type":"operators_mul","id":"syecG2DiohkkKAv9f$t*","inputs":{"A":{"shadow":{"type":"number_reporter","id":"k?BZ|_Rk_=bW*WLnV-uD","fields":{"NUMBER":0}},"block":{"type":"looks_pixUV","id":"N*HBR$yQ[H5+z)+pu%iE"}},"B":{"shadow":{"type":"number_reporter","id":"}9qb|bfX@BvqS}d|(vEN","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"C7pO$m%`oR!uss-BdXQi","extraState":{"variableData":{"type":"float","mainText":"uniform pixelAmount"}}}}}}}}}},"B":{"shadow":{"type":"number_reporter","id":"JW`~2bN3l4E9KYq7)TC?","fields":{"NUMBER":0}},"block":{"type":"variables_variable_reporter","id":"d.LF#LD4#N41`7!tpeT5","extraState":{"variableData":{"type":"float","mainText":"uniform pixelAmount"}}}}}}},"TEXTURE":{"block":{"type":"variables_variable_reporter","id":"ib@1beMe7,|ii`]:|4c/","extraState":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}}}}}}},"next":{"block":{"type":"looks_mulBlending","id":"L87I]~9DK?d;;%D*]2Rt"}}}}}]},"variables":[{"name":"uniform u_skin","id":"uniform_u_skin","type":"texture"},{"name":"uniform pixelAmount","id":"uniform_pixelAmount","type":"float"}]},"dynamicDat":{"dynamic_variables":[{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"texture","mainText":"uniform u_skin"}}},{"type":"duplicate","of":"variable_reporter","extraData":{"variableData":{"type":"float","mainText":"uniform pixelAmount"}}},{"type":"duplicate","of":"variable_set"},{"type":"duplicate","of":"variable_change"},{"type":"duplicate","of":"variable_multiply"},{"type":"duplicate","of":"variable_divide"}],"dynamic_myblocks":[]},"glsl":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float pixelAmount;\n\n//Fragment Shader\nvoid fragment() {\ngl_FragColor = v_color;\n\n\ngl_FragColor = texture2D(u_skin,(floor((v_texCoord * pixelAmount)) / pixelAmount));\ngl_FragColor.rgb *= vec3(gl_FragColor.a);\n}//Vertex Shader\nvoid vertex() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}","isText":false,"savedVarState":{"seperation":"0.01","pixelAmount":"12"}},"fragShader":"//replacement shader\n//Base Variables\n\n\n\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float pixelAmount;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_FragColor = v_color;\n\n\ngl_FragColor = texture2D(u_skin,(floor((v_texCoord * pixelAmount)) / pixelAmount));\ngl_FragColor.rgb *= vec3(gl_FragColor.a);\n}","vertShader":"//replacement shader\n//Base Variables\nattribute highp vec4 a_position;\nattribute highp vec4 a_color;\nattribute highp vec2 a_texCoord;\n \nvarying highp vec4 v_color;\nvarying highp vec2 v_texCoord;\n\nvarying highp float v_depth;\nuniform highp float u_timer;\nuniform highp mat4 u_transform;\n\n//Pen+ Textures\nuniform mediump vec2 u_res;\n\n//Base functions\nhighp float log10(highp float a) {\n  return log(a)/log(10.0);\n}\n\nhighp float eulernum(highp float a) {\n    return 2.718 * a;\n}\n\nhighp vec4 HSVToRGB(highp float hue, highp float saturation, highp float value, highp float a) {\n  highp float huePrime = mod(hue,360.0);\n  highp float c = (value/100.0) * (saturation/100.0);\n  highp float x = c * (1.0 - abs(mod(huePrime/60.0, 2.0) - 1.0));\n  highp float m = (value/100.0) - c;\n  highp float r = 0.0;\n  highp float g = 0.0;\n  highp float b = 0.0;\n  \n  if (huePrime >= 0.0 && huePrime < 60.0) {\n      r = c;\n      g = x;\n      b = 0.0;\n  } else if (huePrime >= 60.0 && huePrime < 120.0) {\n      r = x;\n      g = c;\n      b = 0.0;\n  } else if (huePrime >= 120.0 && huePrime < 180.0) {\n      r = 0.0;\n      g = c;\n      b = x;\n  } else if (huePrime >= 180.0 && huePrime < 240.0) {\n      r = 0.0;\n      g = x;\n      b = c;\n  } else if (huePrime >= 240.0 && huePrime < 300.0) {\n      r = x;\n      g = 0.0;\n      b = c;\n  } else if (huePrime >= 300.0 && huePrime < 360.0) {\n      r = c;\n      g = 0.0;\n      b = x;\n  }\n  r += m;\n  g += m;\n  b += m;\n  return vec4(r, g, b, a);\n}\n\nhighp vec4 rotation(highp vec4 invec4) {\n    return vec4(\n      (invec4.y) * u_transform[1][0] + (invec4.x) * u_transform[1][1],\n      (invec4.y) * u_transform[1][1] - (invec4.x) * u_transform[1][0],\n      invec4.zw\n    );\n  }\n    \nuniform sampler2D u_skin;\n\nuniform highp float pixelAmount;\n\n//Fragment Shader\n//Vertex Shader\nvoid main() {\ngl_Position = (rotation(a_position) + vec4(u_transform[0][2],u_transform[0][3],0,0)) * vec4(a_position.w * u_transform[0][0],a_position.w * -u_transform[0][1],1,1) - vec4(0,0,1,0);\nv_color = a_color;\nv_texCoord = a_texCoord;\n}"},"modifyDate":1719608929043}
  }

  const defaultParameters = {
    "Chromatic Abberation" : {
      "seperation": 0.011
    },
    "Posterization" : {
      "Colors": 3
    },
    "Pixelated" : {
      "pixelAmount": 8
    }
  }

  //Pen+ Addon API
  let penPlus; Scratch.vm.runtime.on("EXTENSION_ADDED", () => {penPlus = runtime.ext_obviousalexc_penPlus}); if (!Scratch.vm.extensionManager.isExtensionLoaded("penP")) {if (Scratch.extensions.isPenguinMod) {Scratch.vm.extensionManager.loadExtensionURL("https://pen-group.github.io/extensions/extensions/PenP/v7.js");} else {Scratch.vm.extensionManager.loadExtensionURL("https://extensions.turbowarp.org/obviousAlexC/penPlus.js");}}


  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = runtime.renderer;
  const gl = renderer._gl;
  const twgl = renderer.exports.twgl;

  const GL_POS_FINDER = /gl_Position\s*=[\w\s\d[\]|&^%$#@!+=\-*\/,._()]*;/gm;
  const GL_POS_VAR = /vec4\s*a_position;/gm;

  let reRenderInfo = twgl.createBufferInfoFromArrays(gl, {
    a_position:    { numComponents: 4, data: [
      -1, -1, 0, 1,
      1, -1, 0, 1,
      1, 1, 0, 1,
      -1, -1, 0, 1,
      1, 1, 0, 1,
      -1, 1, 0, 1
    ]},
    a_texCoord: { numComponents: 2, data: [
      0,1,
      1,1,
      1,0,
      0,1,
      1,0,
      0,0
    ]},
    a_color: { numComponents: 4, data: [
      1,1,1,1,
      1,1,1,1,
      1,1,1,1,

      1,1,1,1,
      1,1,1,1,
      1,1,1,1
    ]}
  });

  const stageBufferAttachments = [
    {
      format: gl.RGBA,
      type: gl.UNSIGNED_BYTE,
      min: gl.LINEAR,
      wrap: gl.CLAMP_TO_EDGE,
      premultiplyAlpha: true,
    },
    { format: gl.DEPTH_STENCIL },
  ];
  const stageBuffer = twgl.createFramebufferInfo(gl, stageBufferAttachments);

  let currentFrameBuffer = null;
  let currentShader = null;

  let parentExtension = null;
  let shouldBeDirty = false;

  //Should add name to the thing.
  let spriteShaders = {};
  let recompiledShaders = {};

  class extension {
    //Awesome
    advDrawThese (drawables, drawMode, projection, opts = {}) {

      const gl = renderer._gl;
      let currentShader = null;

      const framebufferSpaceScaleDiffers = (
          'framebufferWidth' in opts && 'framebufferHeight' in opts &&
          opts.framebufferWidth !== renderer._nativeSize[0] && opts.framebufferHeight !== renderer._nativeSize[1]
      );

      const numDrawables = drawables.length;
      for (let drawableIndex = 0; drawableIndex < numDrawables; ++drawableIndex) {
          const drawableID = drawables[drawableIndex];

          // If we have a filter, check whether the ID fails
          if (opts.filter && !opts.filter(drawableID)) continue;

          const drawable = renderer._allDrawables[drawableID];
          /** @todo check if drawable is inside the viewport before anything else */

          // Hidden drawables (e.g., by a "hide" block) are not drawn unless
          // the ignoreVisibility flag is used (e.g. for stamping or touchingColor).
          if (!drawable.getVisible() && !opts.ignoreVisibility) continue;

          // drawableScale is the "framebuffer-pixel-space" scale of the drawable, as percentages of the drawable's
          // "native size" (so 100 = same as skin's "native size", 200 = twice "native size").
          // If the framebuffer dimensions are the same as the stage's "native" size, there's no need to calculate it.
          const drawableScale = framebufferSpaceScaleDiffers ? [
              drawable.scale[0] * opts.framebufferWidth / renderer._nativeSize[0],
              drawable.scale[1] * opts.framebufferHeight / renderer._nativeSize[1]
          ] : drawable.scale;

          // If the skin or texture isn't ready yet, skip it.
          if (!drawable.skin || !drawable.skin.getTexture(drawableScale)) continue;

          // Skip private skins, if requested.
          if (opts.skipPrivateSkins && drawable.skin.private) continue;

          const drawableShader = spriteShaders[drawableID]

          let uniforms = {};

          let effectBits = drawable.enabledEffects;
          effectBits &= Object.prototype.hasOwnProperty.call(opts, 'effectMask') ? opts.effectMask : effectBits;

          const newShader = (spriteShaders[drawableID] && penPlus.shaders[drawableShader] && recompiledShaders[spriteShaders[drawableID]]) ? 
          recompiledShaders[spriteShaders[drawableID]] : 
          renderer._shaderManager.getShader(drawMode, effectBits);

          // Manually perform region check. Do not create functions inside a
          // loop.
          // ! no
          if (renderer._regionId !== newShader) {
            renderer._doExitDrawRegion();
            renderer._regionId = newShader;

              currentShader = newShader;
              gl.useProgram(currentShader.program);
              twgl.setBuffersAndAttributes(gl, currentShader, renderer._bufferInfo);
              Object.assign(uniforms, {
                  u_projectionMatrix: projection
              });
          }

          Object.assign(uniforms,
              drawable.skin.getUniforms(drawableScale),
              drawable.getUniforms());

          // Apply extra uniforms after the Drawable's, to allow overwriting.
          if (opts.extraUniforms) {
              Object.assign(uniforms, opts.extraUniforms);
          }

          if (spriteShaders[drawableID] && penPlus.shaders[drawableShader]) {
            penPlus.programs[drawableShader].uniformDat.u_res = [
              gl.canvas.width,
              gl.canvas.height,
            ];
            penPlus.programs[drawableShader].uniformDat.u_timer = runtime.ioDevices.clock.projectTimer();
            
            penPlus.programs[drawableShader].uniformDat.u_transform = [
              1,1,0,0,
              0,1,0,0,
              0,0,0,0,
              0,0,0,0
            ]

            shouldBeDirty = true;

            uniforms = Object.assign({},uniforms, penPlus.programs[drawableShader].uniformDat);
          }

          if (uniforms.u_skin) {
              twgl.setTextureParameters(
                  gl, uniforms.u_skin, {
                      minMag: drawable.skin.useNearest(drawableScale, drawable) ? gl.NEAREST : gl.LINEAR
                  }
              );
          }

          twgl.setUniforms(currentShader, uniforms);
          twgl.drawBufferInfo(gl, renderer._bufferInfo, gl.TRIANGLES);
      }

      renderer._regionId = null;
    }

    //Will allow us to use custom shaders within our entire stage.
    customDrawFunction() {
      if (!renderer.dirty) {
          return;
      }
      renderer.dirty = false;
      shouldBeDirty = false;

      renderer._doExitDrawRegion();

      const gl = renderer._gl;
      
      //Our injected code
      if (currentFrameBuffer) {
        twgl.resizeFramebufferInfo(
          gl,
          currentFrameBuffer,
          stageBufferAttachments,
          Scratch.Cast.toNumber(gl.canvas.width),
          Scratch.Cast.toNumber(gl.canvas.height)
        );

        twgl.bindFramebufferInfo(gl, currentFrameBuffer);
      }
      else {
        twgl.bindFramebufferInfo(gl, null);
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clearColor(...renderer._backgroundColor4f);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const snapshotRequested = renderer._snapshotCallbacks.length > 0;
      renderer._drawThese(renderer._drawList, 'default', renderer._projection, {
        framebufferWidth: gl.canvas.width,
        framebufferHeight: gl.canvas.height,
        skipPrivateSkins: snapshotRequested
      });

      if (snapshotRequested) {
          const snapshot = gl.canvas.toDataURL();
          renderer._snapshotCallbacks.forEach(cb => cb(snapshot));
          renderer._snapshotCallbacks = [];
          // We need to make sure to always render next frame so that private skins
          // that were skipped this frame will become visible again shortly.
          renderer.dirty = true;
      }

      if (currentFrameBuffer) {
        if ((!penPlus.programs[currentShader])) {
          parentExtension.resetBuffer();
          //re-render if no shader is found.
          renderer.dirty = true;
          return;
        }

        twgl.bindFramebufferInfo(gl, null);
        gl.useProgram(penPlus.programs[currentShader].info.program);

        twgl.setBuffersAndAttributes(
          gl,
          penPlus.programs[currentShader].info,
          reRenderInfo
        );

        penPlus.programs[currentShader].uniformDat.u_skin = stageBuffer.attachments[0];
        penPlus.programs[currentShader].uniformDat.u_res = [
          gl.canvas.width,
          gl.canvas.height,
        ];
        penPlus.programs[currentShader].uniformDat.u_timer = runtime.ioDevices.clock.projectTimer();
        
        penPlus.programs[currentShader].uniformDat.u_transform = [
          1,1,0,0,
          0,1,0,0,
          0,0,0,0,
          0,0,0,0
        ]

        twgl.setUniforms(penPlus.programs[currentShader].info, penPlus.programs[currentShader].uniformDat);

        twgl.drawBufferInfo(gl, reRenderInfo);
        renderer.dirty = true;
      }

      if (shouldBeDirty) {
        renderer.dirty = true;
      }
    }

    addDefaultShaders() {
      if (penPlus) {
        Object.keys(defaultShaders).forEach(shaderName => {
          if (!penPlus.shaders[shaderName]) {
            if (defaultShaders[shaderName].projectData.projectData) {
              penPlus.saveShader(shaderName,{
                projectData: defaultShaders[shaderName].projectData.projectData,
                vertShader: defaultShaders[shaderName].projectData.vertShader,
                fragShader: defaultShaders[shaderName].projectData.fragShader
              });
            }
            else {
              penPlus.saveShader(shaderName,{
                projectData: defaultShaders[shaderName].projectData,
                vertShader: defaultShaders[shaderName].vertShader,
                fragShader: defaultShaders[shaderName].fragShader
              });
            }
          }

          setTimeout(() => {
            if (defaultParameters[shaderName]) {
              penPlus.programs[shaderName].uniformDat = defaultParameters[shaderName];
            }
          }, 33);

        });
      }
    }

    saveThingExists = false;

    addSaveListeners() {
      if (this.saveThingExists) return;

      if (penPlus) {
        console.log("Shaded : Adding Save Listener")
        this.saveThingExists = true;
        penPlus.addEventListener("shaderSaved", (event) => {
          console.log(`converting shader ${event.name} to sprite format!`);

          let convertedVertex = event.vertexShader.replaceAll(GL_POS_FINDER,"gl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position,0,1);");
          convertedVertex = convertedVertex.replaceAll(GL_POS_VAR,"vec2 a_position;");
          convertedVertex = "uniform highp mat4 u_projectionMatrix; uniform highp mat4 u_modelMatrix;\n" + convertedVertex;
          
          recompiledShaders[event.name] = twgl.createProgramInfo(gl,[
            convertedVertex,
            event.fragmentShader
          ]);
        });
      }
    }

    constructor() {
      parentExtension = this;
      renderer.draw = this.customDrawFunction;
      renderer._drawThese = this.advDrawThese;

      vm.runtime.on("targetWasRemoved", (clone) => {
        const cloneID = clone.drawableID;
        if (spriteShaders[cloneID]) {
          delete spriteShaders[cloneID];
        }
      });

      vm.runtime.on("PROJECT_LOADED", () => {
        const checkFrame = () => {
          if (penPlus) {
            Object.keys(defaultShaders).forEach(shaderName => {
              if (!penPlus.shaders[shaderName]) {
                if (defaultShaders[shaderName].projectData.projectData) {
                  penPlus.saveShader(shaderName,{
                    projectData: defaultShaders[shaderName].projectData.projectData,
                    vertShader: defaultShaders[shaderName].projectData.vertShader,
                    fragShader: defaultShaders[shaderName].projectData.fragShader
                  });
                }
                else {
                  penPlus.saveShader(shaderName,{
                    projectData: defaultShaders[shaderName].projectData,
                    vertShader: defaultShaders[shaderName].vertShader,
                    fragShader: defaultShaders[shaderName].fragShader
                  });
                }
              }

              setTimeout(() => {
                if (defaultParameters[shaderName]) {
                  penPlus.programs[shaderName].uniformDat = defaultParameters[shaderName];
                }
              }, 33);

            });
          }
          else {
            window.requestAnimationFrame(checkFrame);
          }
        }
        window.requestAnimationFrame(checkFrame);
        setTimeout(() => {
          Object.keys(penPlus.shaders).forEach(name => {
            console.log(`converting shader ${name} to sprite format!`);

            const event = penPlus.shaders[name].projectData;

            let convertedVertex = event.vertShader.replaceAll(GL_POS_FINDER,"gl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position,0,1);");
            convertedVertex = convertedVertex.replaceAll(GL_POS_VAR,"vec2 a_position;");
            convertedVertex = "uniform highp mat4 u_projectionMatrix; uniform highp mat4 u_modelMatrix;\n" + convertedVertex;
            
            recompiledShaders[name] = twgl.createProgramInfo(gl,[
              convertedVertex,
              event.fragShader
            ]);
          })
        },500)
      });

      Scratch.vm.runtime.on("EXTENSION_ADDED", this.addSaveListeners);
    }

    getInfo() {
      return {
        blocks: [
          {
            blockType:Scratch.BlockType.LABEL,
            text:"put a random pen+"
          },
          {
            blockType:Scratch.BlockType.LABEL,
            text:"block in to save shaders!"
          },
          {
            blockType:Scratch.BlockType.BUTTON,
            text:"Add Default Shaders",
            func:"addDefaultShaders"
          },
          {
            opcode: "setStageShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "use [shader] on the screen",
            hideFromPalette:true,
            arguments: {
              shader: {
                type: Scratch.ArgumentType.STRING,
                menu: "shadersAndStage",
              },
            },
          },
          {
            opcode: "setStageShaderAlt",
            blockType: Scratch.BlockType.COMMAND,
            text: "use [shader] on the screen",
            arguments: {
              shader: {
                type: Scratch.ArgumentType.STRING,
                menu: "shadersAndStageALT",
              },
            },
          },
          "---",
          {
            opcode: "setSpriteShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "use [shader] on myself",
            arguments: {
              shader: {
                type: Scratch.ArgumentType.STRING,
                menu: "shadersAndStageALT",
              },
            },
          },
          {
            opcode: "setExtraShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "use [shader] on the [target]",
            arguments: {
              target: {
                type: Scratch.ArgumentType.STRING,
                menu: "extraTargets",
              },
              shader: {
                type: Scratch.ArgumentType.STRING,
                menu: "shadersAndStageALT",
              },
            },
          },
          {
            opcode: "getDescrepency",
            blockType: Scratch.BlockType.REPORTER,
            text: "scale multiplier of the [dimension]",
            arguments: {
              dimension: {
                type: Scratch.ArgumentType.STRING,
                menu: "dimensions",
              }
            },
          }
        ],
        menus: {
          shaders: {
            items:"shaderMenu"
          },
          shadersAndStage: {
            items:"shaderMenuAndStage"
          },
          shadersAndStageALT: {
            items:"shaderMenuAndStage",
            acceptReporters:true
          },
          extraTargets: {
            items: [
              {
                text:"pen layer",
                value:"pen"
              },
              {
                text:"stage",
                value:"stage"
              },
              {
                text:"camera",
                value:"camera"
              }
            ]
          },
          dimensions: {
            items:["width","height"],
            acceptReporters:true
          }
        },
        name: "Shaded",
        id: "OACShaded",
      };
    }

    getDescrepency({ dimension }) {
      if (dimension == "width") {
        return gl.canvas.width / renderer._nativeSize[0];
      }
      return gl.canvas.height / renderer._nativeSize[1];
    }

    shaderMenu() {
      if (penPlus) {
        return penPlus.shaderMenu();
      }
      return ["None Yet"];
    }

    shaderMenuAndStage() {
      if (penPlus) {
        let returnedShaders = [{value:"____PEN_PLUS__NO__SHADER____", text:"No Shader!"}];
        const penPShaders = Object.keys(penPlus.shaders);
        penPShaders.forEach(shader => {
          returnedShaders.push({value:shader,text:shader});
        });

        return returnedShaders;
      }
      return [{value:"____PEN_PLUS__NO__SHADER____", text:"No Shader!"}];
    }

    resetBuffer() {
      currentFrameBuffer = null;
      renderer.dirty = true;
    }

    setStageShaderAlt(args,util) {
      this.setStageShader(args,util);
    }

    setStageShader({ shader },util) {
      if (shader == "____PEN_PLUS__NO__SHADER____") {
        this.resetBuffer();
        return;
      }
      
      if (currentFrameBuffer != stageBuffer) {
        currentFrameBuffer = stageBuffer;
      }

      currentShader = shader;
      if (!penPlus.shaders[shader]) {
        this.resetBuffer();
        return;
      }

      renderer.dirty = true;
    }

    setSpriteShader({ shader },util) {
      if (shader == "____PEN_PLUS__NO__SHADER____") {
        delete spriteShaders[util.target.drawableID];
        this.resetBuffer();
        return;
      }

      if (!penPlus.shaders[shader]) {
        delete spriteShaders[util.target.drawableID];
        this.resetBuffer();
        return;
      }
      spriteShaders[util.target.drawableID] = shader;
      renderer.dirty = true;
    }

    setExtraShader({ target, shader },util) {
      let DesiredID = -1;
      switch(target) {
        case "pen":
          if (!runtime.ext_videoSensing) break;
          DesiredID = runtime.ext_pen._penDrawableId;
          break;

        case "camera":
          if (!runtime.ext_videoSensing) break;
          DesiredID = runtime.ioDevices.video._drawable;
          break;

        case "stage":
          if (!runtime.getTargetForStage()) break;
          DesiredID = runtime.getTargetForStage().drawableID;
          break;
        
        default:
          break;
      }

      console.log(DesiredID);

      if (DesiredID == -1) return;

      if (shader == "____PEN_PLUS__NO__SHADER____") {
        delete spriteShaders[DesiredID];
        this.resetBuffer();
        return;
      }

      if (!penPlus.shaders[shader]) {
        delete spriteShaders[DesiredID];
        this.resetBuffer();
        return;
      }
      spriteShaders[DesiredID] = shader;
      renderer.dirty = true;
    }
  }

  Scratch.extensions.register(new extension());
})(Scratch);
