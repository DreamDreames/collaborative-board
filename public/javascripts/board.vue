<template>
    <codemirror ref='cm'
                :value="code" 
                :options="cmOption"
                @change="onChange">
    </codemirror>
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
            status: '',
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
            this.status = 'updating';
            console.log("updating message: ", data);
            self.code = data.message;
        });
    },
    mounted: function() {
        this.$refs.cm.codemirror.on('change', this.onChange);
    },
    methods: {
        onChange: function(cm, changeObj) {
            console.log("input changed: ", cm.getValue()); 
            if(changeObj.origin != 'setValue') {
                console.log("emiting message: ", cm.getValue());
                this.socket.emit('update', {message: cm.getValue()});
            }
            else {
                console.log("not emiting message");
            }
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