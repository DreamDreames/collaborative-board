<template>
<div> 
    <div class="row"> 
        <div class="col-12 col-md-6 col-xl d-flex"> 
            <div class="card flex-fill"> 
                <div class="card-body py-2"> 
                    <div class="row"> 
                        <codemirror ref='cm' 
                                    :value="code" 
                                    :options="cmOption" 
                                    @change="onChange" > 
                        </codemirror>                                        
                    </div>
                </div> 
            </div>
        </div>
    </div>
    <div class="clearfix">
        <div class="dropdown float-right mt--1 d-none d-md-flex"> 
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                {{ curLanguage }}
            </button> 
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
                <a v-for="lang in languages" :key="lang" class="dropdown-item" @click="onLanChange(lang)" href="#">{{ lang }}</a>
            </div> 
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/keymap/sublime'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/python/python.js'
import io from 'socket.io-client'
import '../stylesheets/cm.css'


export default { 
    components: { 
        codemirror
    },
    data() {
        return {
            socket: io(),
            boardId: undefined,
            code: 'const A = 10',
            languageModes: {
                'c': 'text/x-csrc',
                'c++': 'text/x-c++src',
                'java': 'text/x-java',
                'javascript': 'text/javascript',
                'python': 'text/x-python'
            },
            curLanguage: 'java',
            cmOption: { 
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                foldGutter: true,
                styleSelectedText: true,
                mode: 'text/x-java',
                keyMap: "sublime",
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                extraKeys: { "Ctrl": "autocomplete" },
                hintOptions:{
                  completeSingle: false
                },
                viewportMargin: Infinity
            }
        }
    },
    created: function() {
        console.log(this.$route);
        this.boardId = this.$route.params.boardId;
    },
    mounted: function() {
        this.$refs.cm.codemirror.on('change', this.onChange);
        this.configureSocket();
    },
    computed: {
        languages: function() {
            return _.keys(this.languageModes);
        },
    },
    methods: {
        getBoardId: function() {
            return this.boardId;
        },
        joinBoard: function() {
            let id = this.getBoardId();
            console.log("boardId: ", id);
            this.socket.emit('join', {boardId: id});
        },
        listenUpdate: function() {
            var self = this;
            this.socket.on('update', function (data) {
                console.log("receiving message and updating: ", data);
                self.code = data.message;
            });
        },
        configureSocket: function() {
            this.joinBoard();
            this.listenUpdate();
        },
        onChange: function(cm, changeObj) {
            console.log("input changed: ", cm.getValue()); 
            if(changeObj.origin != 'setValue') {
                console.log("emiting message: ", cm.getValue());
                this.socket.emit('update', {
                    message: cm.getValue(), 
                    boardId: this.boardId
                });
            }
            else {
                console.log("not emiting message");
            }
        },
        onLanChange: function(language) {
            this.curLanguage = language;
            this.cmOption.mode = this.languageModes[language];
            this.socket.emit('language', {
                language: language,
                boardId: this.boardId
            })
        }
    }
}
</script>