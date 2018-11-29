<template>
    <codemirror v-model="code" 
                :options="cmOption"
                @input="onChange"></codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/keymap/sublime'
import io from 'socket.io-client'

export default { 
    components: { 
        codemirror
    },
    data() {
        return {
            socket: io(),
            code: 'const A = 10',
            cmOption: { 
                tabSize: 4,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                foldGutter: true,
                styleSelectedText: true,
                mode: 'text/javascript',
                keyMap: "sublime",
                matchBrackets: true,
                showCursorWhenSelecting: true,
                theme: "monokai",
                extraKeys: { "Ctrl": "autocomplete" },
                hintOptions:{
                  completeSingle: false
                }
            }
        }
    },
    created: function() {
        var self = this;
        this.socket.on('update', function (data) {
            console.log("receiving message: ", data);
            if(self.code == data.message) {
                return;
            }
            self.code = data.message;
        });
    },
    methods: {
        onChange: function(cm) {
            console.log("input changed: ", cm); 
            this.socket.emit('update', {message: cm});
        },
        updateBoard: function(data) {
            if(!data) {
                return;
            }
            this.code = data.message;
        },
    }
}
</script>