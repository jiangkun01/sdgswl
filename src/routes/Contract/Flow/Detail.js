import BpmnViewer from 'bpmn-js';
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form,
  Input, Button, Table, Tabs, Divider,
  Icon, message, Modal } from 'antd';
import Information from '../Information';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const { TabPane } = Tabs;
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1" name="开始">
      <bpmn:outgoing>SequenceFlow_1651aow</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:task id="Task_0zfytgw" name="业务部经办人">
      <bpmn:incoming>SequenceFlow_1651aow</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1v00dav</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1651aow" sourceRef="StartEvent_1" targetRef="Task_0zfytgw" />
    <bpmn:task id="Task_1tx33zv" name="业务部负责人">
      <bpmn:incoming>SequenceFlow_1v00dav</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_00m8q3e</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1v00dav" sourceRef="Task_0zfytgw" targetRef="Task_1tx33zv" />
    <bpmn:task id="Task_1epawsf" name="风控部意见" >
      <bpmn:incoming>SequenceFlow_00m8q3e</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_03t7qn7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_00m8q3e" sourceRef="Task_1tx33zv" targetRef="Task_1epawsf" />
    <bpmn:task id="Task_06ggor1" name="财务部意见">
      <bpmn:incoming>SequenceFlow_03t7qn7</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1t6bca4</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_03t7qn7" sourceRef="Task_1epawsf" targetRef="Task_06ggor1" />
    <bpmn:task id="Task_14petbl" name="操作不意见">
      <bpmn:incoming>SequenceFlow_1t6bca4</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_17l7oy1</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1t6bca4" sourceRef="Task_06ggor1" targetRef="Task_14petbl" />
    <bpmn:task id="Task_1g5g2y3" name="业务分管领导意见">
      <bpmn:incoming>SequenceFlow_17l7oy1</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0o7q673</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_163mmtg" name="风控分管领导意见">
      <bpmn:incoming>SequenceFlow_0o7q673</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1ca79dt</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0o7q673" sourceRef="Task_1g5g2y3" targetRef="Task_163mmtg" />
    <bpmn:task id="Task_0b9zlo9" name="财务总监审签">
      <bpmn:incoming>SequenceFlow_1ca79dt</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1d2hjy0</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1ca79dt" sourceRef="Task_163mmtg" targetRef="Task_0b9zlo9" />
    <bpmn:task id="Task_1y5fmek" name="风控部复审">
      <bpmn:incoming>SequenceFlow_1d2hjy0</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0lqcqe4</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1d2hjy0" sourceRef="Task_0b9zlo9" targetRef="Task_1y5fmek" />
    <bpmn:task id="Task_02cth56" name="总经理审签">
      <bpmn:incoming>SequenceFlow_0lqcqe4</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_181slh7</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0lqcqe4" sourceRef="Task_1y5fmek" targetRef="Task_02cth56" />
    <bpmn:sequenceFlow id="SequenceFlow_17l7oy1" sourceRef="Task_14petbl" targetRef="Task_1g5g2y3" />
    <bpmn:task id="Task_1kvrmqe" name="执行董事审签">
      <bpmn:incoming>SequenceFlow_181slh7</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_02uelng</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1iwurhj</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_181slh7" sourceRef="Task_02cth56" targetRef="Task_1kvrmqe" />
    <bpmn:endEvent id="EndEvent_0zunkal" name="结束">
      <bpmn:incoming>SequenceFlow_0egrj60</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_1iwurhj</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:task id="Task_1i67lhn" name="运营中心审签">
      <bpmn:incoming>SequenceFlow_02uelng</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0znwtx8</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1onafn3</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_04fhqag</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_02uelng" sourceRef="Task_1kvrmqe" targetRef="Task_1i67lhn" />
    <bpmn:task id="Task_1tb325y" name="法务部审签">
      <bpmn:incoming>SequenceFlow_1onafn3</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_18vfomd</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_15z1s0q</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_1fn6rfi</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1onafn3" sourceRef="Task_1i67lhn" targetRef="Task_1tb325y" />
    <bpmn:task id="Task_1xhbb22" name="财务审计部审签">
      <bpmn:incoming>SequenceFlow_15z1s0q</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0n0a40d</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0xbq26l</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0xb8kly</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0fygc37</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0709jz5</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_15z1s0q" sourceRef="Task_1tb325y" targetRef="Task_1xhbb22" />
    <bpmn:task id="Task_11rxfww" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_04fhqag</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0znwtx8</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_04fhqag" sourceRef="Task_1i67lhn" targetRef="Task_11rxfww" />
    <bpmn:sequenceFlow id="SequenceFlow_18vfomd" sourceRef="Task_1c90u44" targetRef="Task_1tb325y" />
    <bpmn:task id="Task_1c90u44" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_1fn6rfi</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_18vfomd</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1fn6rfi" sourceRef="Task_1tb325y" targetRef="Task_1c90u44" />
    <bpmn:sequenceFlow id="SequenceFlow_0znwtx8" sourceRef="Task_11rxfww" targetRef="Task_1i67lhn" />
    <bpmn:task id="Task_065l50l" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_0xbq26l</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0n0a40d</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0xbq26l" sourceRef="Task_1xhbb22" targetRef="Task_065l50l" />
    <bpmn:sequenceFlow id="SequenceFlow_0n0a40d" sourceRef="Task_065l50l" targetRef="Task_1xhbb22" />
    <bpmn:task id="Task_1e4ema8" name="运营中心审签">
      <bpmn:incoming>SequenceFlow_0xb8kly</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_09z9jpo</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_007eun0" name="法务部审签">
      <bpmn:incoming>SequenceFlow_0fygc37</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_15z7di4</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_1vlnna5" name="财务审计部审签">
      <bpmn:incoming>SequenceFlow_0709jz5</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0p0vesu</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0xb8kly" sourceRef="Task_1xhbb22" targetRef="Task_1e4ema8" />
    <bpmn:sequenceFlow id="SequenceFlow_0fygc37" sourceRef="Task_1xhbb22" targetRef="Task_007eun0" />
    <bpmn:sequenceFlow id="SequenceFlow_0709jz5" sourceRef="Task_1xhbb22" targetRef="Task_1vlnna5" />
    <bpmn:task id="Task_1u2ism2" name="风管领导意见">
      <bpmn:incoming>SequenceFlow_09z9jpo</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_15z7di4</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0p0vesu</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_16304t5</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1indt2c</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0ec1jm6</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_09z9jpo" sourceRef="Task_1e4ema8" targetRef="Task_1u2ism2" />
    <bpmn:sequenceFlow id="SequenceFlow_15z7di4" sourceRef="Task_007eun0" targetRef="Task_1u2ism2" />
    <bpmn:sequenceFlow id="SequenceFlow_0p0vesu" sourceRef="Task_1vlnna5" targetRef="Task_1u2ism2" />
    <bpmn:task id="Task_0pbxm2o" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_1indt2c</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_16304t5</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1indt2c" sourceRef="Task_1u2ism2" targetRef="Task_0pbxm2o" />
    <bpmn:sequenceFlow id="SequenceFlow_16304t5" sourceRef="Task_0pbxm2o" targetRef="Task_1u2ism2" />
    <bpmn:task id="Task_0vdnii1" name="总会计师意见">
      <bpmn:incoming>SequenceFlow_0ec1jm6</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_17tuzgg</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0h33ccs</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_19vqjpb</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0ec1jm6" sourceRef="Task_1u2ism2" targetRef="Task_0vdnii1" />
    <bpmn:task id="Task_0bv31sn" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_0h33ccs</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_17tuzgg</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0h33ccs" sourceRef="Task_0vdnii1" targetRef="Task_0bv31sn" />
    <bpmn:sequenceFlow id="SequenceFlow_17tuzgg" sourceRef="Task_0bv31sn" targetRef="Task_0vdnii1" />
    <bpmn:task id="Task_0d8axlv" name="总经理意见">
      <bpmn:incoming>SequenceFlow_19vqjpb</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_0s7txvl</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0y7tsbu</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_00su6qv</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_19vqjpb" sourceRef="Task_0vdnii1" targetRef="Task_0d8axlv" />
    <bpmn:task id="Task_17kx1q7" name="全书单位业务代表意见修订">
      <bpmn:incoming>SequenceFlow_0y7tsbu</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_0s7txvl</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_0y7tsbu" sourceRef="Task_0d8axlv" targetRef="Task_17kx1q7" />
    <bpmn:sequenceFlow id="SequenceFlow_0s7txvl" sourceRef="Task_17kx1q7" targetRef="Task_0d8axlv" />
    <bpmn:task id="Task_1iqbgeb" name="执行董事意见">
      <bpmn:incoming>SequenceFlow_152lbl8</bpmn:incoming>
      <bpmn:incoming>SequenceFlow_00su6qv</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_1h30xgi</bpmn:outgoing>
      <bpmn:outgoing>SequenceFlow_0egrj60</bpmn:outgoing>
    </bpmn:task>
    <bpmn:task id="Task_00sa8nw" name="执行董事意见">
      <bpmn:incoming>SequenceFlow_1h30xgi</bpmn:incoming>
      <bpmn:outgoing>SequenceFlow_152lbl8</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="SequenceFlow_1h30xgi" sourceRef="Task_1iqbgeb" targetRef="Task_00sa8nw" />
    <bpmn:sequenceFlow id="SequenceFlow_152lbl8" sourceRef="Task_00sa8nw" targetRef="Task_1iqbgeb" />
    <bpmn:sequenceFlow id="SequenceFlow_0egrj60" sourceRef="Task_1iqbgeb" targetRef="EndEvent_0zunkal" />
    <bpmn:sequenceFlow id="SequenceFlow_1iwurhj" sourceRef="Task_1kvrmqe" targetRef="EndEvent_0zunkal" />
    <bpmn:sequenceFlow id="SequenceFlow_00su6qv" sourceRef="Task_0d8axlv" targetRef="Task_1iqbgeb" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="71" y="103" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="77" y="139" width="24" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_0zfytgw_di" bpmnElement="Task_0zfytgw" fill="#009C52">
        <dc:Bounds x="259" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1651aow_di" bpmnElement="SequenceFlow_1651aow">
        <di:waypoint x="107" y="121" />
        <di:waypoint x="259" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="183" y="99.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1tx33zv_di" bpmnElement="Task_1tx33zv" fill="#009C52">
        <dc:Bounds x="409" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1v00dav_di" bpmnElement="SequenceFlow_1v00dav">
        <di:waypoint x="359" y="120" />
        <di:waypoint x="409" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="384" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1epawsf_di" bpmnElement="Task_1epawsf" fill="#1890FF">
        <dc:Bounds x="559" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_00m8q3e_di" bpmnElement="SequenceFlow_00m8q3e">
        <di:waypoint x="509" y="120" />
        <di:waypoint x="559" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="534" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_06ggor1_di" bpmnElement="Task_06ggor1">
        <dc:Bounds x="709" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_03t7qn7_di" bpmnElement="SequenceFlow_03t7qn7">
        <di:waypoint x="659" y="120" />
        <di:waypoint x="709" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="684" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_14petbl_di" bpmnElement="Task_14petbl">
        <dc:Bounds x="859" y="80" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1t6bca4_di" bpmnElement="SequenceFlow_1t6bca4">
        <di:waypoint x="809" y="120" />
        <di:waypoint x="859" y="120" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="834" y="99" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1g5g2y3_di" bpmnElement="Task_1g5g2y3">
        <dc:Bounds x="859" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_163mmtg_di" bpmnElement="Task_163mmtg">
        <dc:Bounds x="709" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0o7q673_di" bpmnElement="SequenceFlow_0o7q673">
        <di:waypoint x="859" y="262" />
        <di:waypoint x="809" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="834" y="241" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_0b9zlo9_di" bpmnElement="Task_0b9zlo9">
        <dc:Bounds x="559" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1ca79dt_di" bpmnElement="SequenceFlow_1ca79dt">
        <di:waypoint x="709" y="262" />
        <di:waypoint x="659" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="684" y="241" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1y5fmek_di" bpmnElement="Task_1y5fmek">
        <dc:Bounds x="409" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1d2hjy0_di" bpmnElement="SequenceFlow_1d2hjy0">
        <di:waypoint x="559" y="262" />
        <di:waypoint x="509" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="534" y="241" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_02cth56_di" bpmnElement="Task_02cth56">
        <dc:Bounds x="259" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0lqcqe4_di" bpmnElement="SequenceFlow_0lqcqe4">
        <di:waypoint x="409" y="262" />
        <di:waypoint x="359" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="384" y="241" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_17l7oy1_di" bpmnElement="SequenceFlow_17l7oy1">
        <di:waypoint x="959" y="120" />
        <di:waypoint x="992" y="120" />
        <di:waypoint x="992" y="262" />
        <di:waypoint x="959" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="1007" y="185" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1kvrmqe_di" bpmnElement="Task_1kvrmqe">
        <dc:Bounds x="132" y="222" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_181slh7_di" bpmnElement="SequenceFlow_181slh7">
        <di:waypoint x="259" y="262" />
        <di:waypoint x="232" y="262" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="245.5" y="241" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0zunkal_di" bpmnElement="EndEvent_0zunkal">
        <dc:Bounds x="164" y="713" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="170" y="753" width="24" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1i67lhn_di" bpmnElement="Task_1i67lhn">
        <dc:Bounds x="259" y="438" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_02uelng_di" bpmnElement="SequenceFlow_02uelng">
        <di:waypoint x="182" y="305" />
        <di:waypoint x="260" y="444" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="221" y="353.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1tb325y_di" bpmnElement="Task_1tb325y">
        <dc:Bounds x="409" y="438" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1onafn3_di" bpmnElement="SequenceFlow_1onafn3">
        <di:waypoint x="359" y="478" />
        <di:waypoint x="409" y="478" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="384" y="457" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1xhbb22_di" bpmnElement="Task_1xhbb22">
        <dc:Bounds x="559" y="438" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_15z1s0q_di" bpmnElement="SequenceFlow_15z1s0q">
        <di:waypoint x="509" y="478" />
        <di:waypoint x="559" y="478" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="534" y="457" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_11rxfww_di" bpmnElement="Task_11rxfww">
        <dc:Bounds x="259" y="548" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_04fhqag_di" bpmnElement="SequenceFlow_04fhqag">
        <di:waypoint x="309" y="518" />
        <di:waypoint x="309" y="548" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="324" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_18vfomd_di" bpmnElement="SequenceFlow_18vfomd">
        <di:waypoint x="459" y="546" />
        <di:waypoint x="459" y="518" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="474" y="526" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1c90u44_di" bpmnElement="Task_1c90u44">
        <dc:Bounds x="409" y="548" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1fn6rfi_di" bpmnElement="SequenceFlow_1fn6rfi">
        <di:waypoint x="459" y="518" />
        <di:waypoint x="459" y="548" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="474" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0znwtx8_di" bpmnElement="SequenceFlow_0znwtx8">
        <di:waypoint x="309" y="548" />
        <di:waypoint x="309" y="518" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="324" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_065l50l_di" bpmnElement="Task_065l50l">
        <dc:Bounds x="559" y="548" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0xbq26l_di" bpmnElement="SequenceFlow_0xbq26l">
        <di:waypoint x="609" y="518" />
        <di:waypoint x="609" y="548" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="624" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0n0a40d_di" bpmnElement="SequenceFlow_0n0a40d">
        <di:waypoint x="609" y="548" />
        <di:waypoint x="609" y="518" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="624" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1e4ema8_di" bpmnElement="Task_1e4ema8">
        <dc:Bounds x="704" y="338" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_007eun0_di" bpmnElement="Task_007eun0">
        <dc:Bounds x="709" y="438" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_1vlnna5_di" bpmnElement="Task_1vlnna5">
        <dc:Bounds x="709" y="548" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0xb8kly_di" bpmnElement="SequenceFlow_0xb8kly">
        <di:waypoint x="659" y="478" />
        <di:waypoint x="679" y="478" />
        <di:waypoint x="679" y="378" />
        <di:waypoint x="704" y="378" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="694" y="422" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0fygc37_di" bpmnElement="SequenceFlow_0fygc37">
        <di:waypoint x="659" y="478" />
        <di:waypoint x="709" y="478" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="684" y="457" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0709jz5_di" bpmnElement="SequenceFlow_0709jz5">
        <di:waypoint x="659" y="478" />
        <di:waypoint x="679" y="478" />
        <di:waypoint x="679" y="588" />
        <di:waypoint x="709" y="588" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="694" y="527" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1u2ism2_di" bpmnElement="Task_1u2ism2">
        <dc:Bounds x="862" y="439" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_09z9jpo_di" bpmnElement="SequenceFlow_09z9jpo">
        <di:waypoint x="804" y="378" />
        <di:waypoint x="831" y="378" />
        <di:waypoint x="831" y="479" />
        <di:waypoint x="862" y="479" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="846" y="422.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_15z7di4_di" bpmnElement="SequenceFlow_15z7di4">
        <di:waypoint x="809" y="478" />
        <di:waypoint x="862" y="479" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="835.5" y="457.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0p0vesu_di" bpmnElement="SequenceFlow_0p0vesu">
        <di:waypoint x="809" y="588" />
        <di:waypoint x="831" y="588" />
        <di:waypoint x="831" y="479" />
        <di:waypoint x="862" y="479" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="846" y="527.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_0pbxm2o_di" bpmnElement="Task_0pbxm2o">
        <dc:Bounds x="1009" y="438" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1indt2c_di" bpmnElement="SequenceFlow_1indt2c">
        <di:waypoint x="962" y="479" />
        <di:waypoint x="1009" y="478" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="985.5" y="457.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_16304t5_di" bpmnElement="SequenceFlow_16304t5">
        <di:waypoint x="1009" y="478" />
        <di:waypoint x="962" y="479" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="985.5" y="457.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_0vdnii1_di" bpmnElement="Task_0vdnii1">
        <dc:Bounds x="862" y="691" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0ec1jm6_di" bpmnElement="SequenceFlow_0ec1jm6">
        <di:waypoint x="912" y="519" />
        <di:waypoint x="912" y="691" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="927" y="599" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_0bv31sn_di" bpmnElement="Task_0bv31sn">
        <dc:Bounds x="1009" y="691" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0h33ccs_di" bpmnElement="SequenceFlow_0h33ccs">
        <di:waypoint x="962" y="731" />
        <di:waypoint x="1009" y="731" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="985.5" y="710" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_17tuzgg_di" bpmnElement="SequenceFlow_17tuzgg">
        <di:waypoint x="1009" y="731" />
        <di:waypoint x="962" y="731" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="985.5" y="710" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_0d8axlv_di" bpmnElement="Task_0d8axlv">
        <dc:Bounds x="709" y="691" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_19vqjpb_di" bpmnElement="SequenceFlow_19vqjpb">
        <di:waypoint x="862" y="731" />
        <di:waypoint x="809" y="731" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="835.5" y="710" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_17kx1q7_di" bpmnElement="Task_17kx1q7">
        <dc:Bounds x="709" y="828" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0y7tsbu_di" bpmnElement="SequenceFlow_0y7tsbu">
        <di:waypoint x="759" y="771" />
        <di:waypoint x="759" y="828" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="774" y="793.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0s7txvl_di" bpmnElement="SequenceFlow_0s7txvl">
        <di:waypoint x="759" y="828" />
        <di:waypoint x="759" y="771" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="774" y="793.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Task_1iqbgeb_di" bpmnElement="Task_1iqbgeb">
        <dc:Bounds x="559" y="691" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Task_00sa8nw_di" bpmnElement="Task_00sa8nw">
        <dc:Bounds x="559" y="828" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1h30xgi_di" bpmnElement="SequenceFlow_1h30xgi">
        <di:waypoint x="609" y="771" />
        <di:waypoint x="609" y="828" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="624" y="793.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_152lbl8_di" bpmnElement="SequenceFlow_152lbl8">
        <di:waypoint x="609" y="828" />
        <di:waypoint x="609" y="771" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="624" y="793.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0egrj60_di" bpmnElement="SequenceFlow_0egrj60">
        <di:waypoint x="559" y="731" />
        <di:waypoint x="200" y="731" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="379.5" y="710" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1iwurhj_di" bpmnElement="SequenceFlow_1iwurhj">
        <di:waypoint x="182" y="302" />
        <di:waypoint x="182" y="713" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="197" y="501.5" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_00su6qv_di" bpmnElement="SequenceFlow_00su6qv">
        <di:waypoint x="709" y="731" />
        <di:waypoint x="659" y="731" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="684" y="710" width="0" height="12" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`;
@connect(({ loading }) => ({
  loading: loading.models.rule,
}))
@Form.create()
export default class Detail extends PureComponent {
  state = {
    loading: false,
    GJson: 1,
    ItemArray: [],
    modalVisible: false,
    tableModalVisible: false,
  };
  // loading...
  componentWillMount() {
    this.setState({ loading: true });
    const Ia = [];
    Ia.push(
      <Row gutter={24} style={{ marginBottom: '24px' }}>
        <Col span={8} >
          <h3>办理意见1：
            <strong>
              <Input style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }} />
            </strong>
          </h3>
        </Col>
      </Row>
    );
    this.setState({ ItemArray: Ia });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  componentDidMount() {
    const viewer = new BpmnViewer({
      container: '#uid',
    });
    viewer.importXML(xml, (err) => {
      if (err) {
        console.log('error rendering', err);
      } else {
        console.log('rendered');
      }
    });
    const eventBus = viewer.get('eventBus');

    const events = [
      'element.hover',
      'element.out',
      'element.click',
      'element.dblclick',
      'element.mousedown',
      'element.mouseup',
    ];

    events.forEach((event) => {
      eventBus.on(event, (e) => {
        // e.element = the model element
        // e.gfx = the graphical element
        if (event === 'element.click' &&
          e.element.id !== 'StartEvent_1' &&
          e.element.id !== 'EndEvent_0zunkal'
        ) {
          if (e.element.id === 'Task_0zfytgw') {
            message.info('此节点无任何意见');
          } else if (e.element.id === 'Task_1epawsf') {
            message.info('暂不支持修改自己节点');
          } else if (e.element.id === 'Task_1tx33zv') {
            this.setState({
              tableModalVisible: true,
            });
          } else {
            this.setState({
              modalVisible: true,
            });
          }
        }
        console.log(event, 'on', e.element.id);
      });
    });
  }
  // 转到详情
  toModalMessage = () => {
    location.href = '/#/contract/index/details/6';
  }
  // 表格排序查找
  handleTableChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
  }
  render() {
    const { loading } = this.state;
    const hideModalCancel = () => {
      this.setState({
        modalVisible: false,
        tableModalVisible: false,
      });
    };
    const hideModalOk = () => {
      this.setState({
        modalVisible: false,
        tableModalVisible: false,
      });
      message.success('保存成功');
    };
    const addItemArray = (k) => {
      const ItemArrayVo = [];
      this.setState({
        ItemArray: [],
      });
      for (let i = 1; i <= this.state.GJson + k; i += 1) {
        ItemArrayVo.push(
          <Row gutter={24} style={{ marginBottom: '24px' }}>
            <Col span={8} >
              <h3>办理意见{i}：
                <strong>
                  <Input style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }} />
                </strong>
              </h3>
            </Col>
            <Divider>
              {this.state.GJson + k > 1 ? (
                <Icon
                  type="close-circle-o"
                  spin="true"
                  disabled={this.state.GJson + k === 1}
                  onClick={() => addItemArray(-1)}
                  style={{ fontSize: 16, color: '#F25D46' }}
                />
              ) : null}
            </Divider>
          </Row>
        );
      }
      this.setState({
        GJson: this.state.GJson + k,
        ItemArray: ItemArrayVo,
      });
    };
    const columns = [
      {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '提出人',
        dataIndex: 'sp',
      },
      {
        title: '提出时间',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '意见内容',
        dataIndex: 'content',
      },
      {
        title: '处理状态',
        dataIndex: 'status',
      }];
    const columns1 = [
      {
        title: '节点名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '办理人',
        dataIndex: 'sp',
      },
      {
        title: '办理时间',
        dataIndex: 'addtime',
        key: 'addtime',
      },
      {
        title: '办理意见',
        dataIndex: 'content',
      },
      {
        title: '办理状态',
        dataIndex: 'status',
      }];
    // 表格数据
    const data = [
      {
        id: 1,
        name: '风控部意见',
        addtime: '2017-08-22',
        sp: '李想',
        content: '暂无',
        status: '完成',
      }, {
        id: 2,
        name: '操作部负责人',
        addtime: '2017-08-22',
        sp: '李雷',
        content: '请修改合同第一款',
        status: '退回',
      }, {
        id: 3,
        name: '风控部负责人',
        addtime: '2017-08-22',
        sp: '韩梅梅',
        content: '暂无',
        status: '代办',
      },
    ];
    const data1 = [
      {
        id: 1,
        name: '风控部意见',
        addtime: '2017-08-22',
        sp: '李想',
        content: '暂无',
        status: '完成',
      },
    ];
    const columns2 = [
      { title: '提出意见人', dataIndex: 'name', key: 'name' },
      { title: '提出时间', dataIndex: 'date', key: 'date' },
      { title: '内容', dataIndex: 'address', key: 'address' },
    ];

    const data2 = [
      { key: 1, name: '李想', date: '2018-01-05', address: '第一条第三款表达不清楚', description: '已修改合同原文，请查看' },
      { key: 2, name: '李想', date: '2018-01-03', address: '缺少流转单', description: '已上传流转单请查看' },
      { key: 3, name: '李想', date: '2018-01-01', address: '缺少合同相对方签字', description: '请带着意见往下执行' },
    ];
    return (
      <PageHeaderLayout title="节点办理">
        <Card bordered={false}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="流程图" key="1">
              <div id="uid" style={{ height: '1200px', width: '1366px' }}>节点查看</div>
            </TabPane>
            <TabPane tab="合同信息" key="2">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Information />
              </Card>
            </TabPane>
            <TabPane tab="合同正文" key="3">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6}><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>合同文本.docx</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="合同附件" key="4">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>长期协议.docx</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/pdf.jpg" /></div><strong>调查报告...</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word1.jpg" /></div><strong>总部决策.doc</strong></div></Col>
                  <Col span={6} ><div style={{ textAlign: 'center' }}><div><img alt="word" src="/excel.jpg" /></div><strong>市场行情...</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="审批单" key="5">
              <Card bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={6}><div style={{ textAlign: 'center' }}><div><img alt="word" src="/word.jpg" /></div><strong>审批单.docx</strong></div></Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="意见反馈" key="6">
              <Card title="意见反馈" bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={24}>
                    <Table
                      dataSource={data}
                      columns={columns}
                      loading={loading}
                      rowKey={record => record.id}
                    />
                  </Col>
                </Row>
              </Card>
              <Card title="办理日志" bordered={false} style={{ marginBottom: '24px' }}>
                <Row gutter={24} style={{ marginBottom: '24px' }}>
                  <Col span={24}>
                    <Table
                      dataSource={data1}
                      columns={columns1}
                      loading={loading}
                      rowKey={record => record.id}
                    />
                  </Col>
                </Row>
              </Card>
            </TabPane>
            <TabPane tab="办理节点" key="7">
              <Card title="办理意见" style={{ marginBottom: '24px' }}>
                {this.state.ItemArray}
                <Button onClick={() => addItemArray(1)}>增加意见条数</Button>
              </Card>
              <Card title="回复意见" style={{ marginBottom: '24px' }}>
                <Row>
                  <Col span={24}>
                    <div>
                      <strong>意见人：李想&nbsp;意见内容：合同条款第三项表达不清楚&nbsp;退回时间： 2018-01-02
                      </strong>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Input style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }} />
                  </Col>
                </Row>
              </Card>
              <Row gutter={24} style={{ marginBottom: '24px' }}>
                <Col span={8} >
                  <Button>转交下一步</Button>
                  <Button style={{ marginLeft: '10px' }}>退回上一节点</Button>
                  <Button style={{ marginLeft: '10px' }}>退回发起节点</Button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Card>
        <Modal
          title="节点设置: 经办人"
          okText="保存"
          cancelText="取消"
          onOk={hideModalOk}
          onCancel={hideModalCancel}
          visible={this.state.modalVisible}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="组织架构" key="1">
              <strong>山东高速物流集团</strong>
              <div style={{ marginTop: '24px' }}>
                <Button icon="plus" size="large" >公司领导</Button>
                <Button icon="plus" size="large">综合办公室</Button>
                <Button icon="plus" size="large">安全技术部</Button>
                <Button icon="plus" size="large">人事政工部</Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="常用联系人" key="2">
              <div>
                <strong>联系人
                </strong>
              </div>
              <div style={{ marginTop: '24px' }}>
                <Button icon="plus" size="large">李雷</Button>
                <Button icon="plus" size="large">张建国</Button>
                <Button icon="plus" size="large">张爱丽</Button>
                <Button icon="plus" size="large">韩梅梅</Button>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="自定义" key="3">
              <div>
                <Button icon="plus" size="large" >财务部 李峰</Button>
              </div>
            </Tabs.TabPane>
          </Tabs>
          <Divider />
          <div>
            <div style={{ height: '100px', width: '100%', border: '1px solid #86C1F7', padding: '10px 10px' }}>
              <Button icon="minus" size="large" >公司领导</Button>
            </div>
            <div style={{ marginTop: '24px' }}>
              <Button onClick={() => message.success('添加到自定义成功！')}>添加到自定义</Button>
            </div>
          </div>
        </Modal>
        <Modal
          title="查看办理意见"
          cancelText="取消"
          onOk={() => {
            this.setState({
              tableModalVisible: false,
            });
          }}
          onCancel={hideModalCancel}
          visible={this.state.tableModalVisible}
        >
          <Table
            columns={columns2}
            expandedRowRender={
              record => <div><p style={{ margin: 0, color: '#0da51b' }}>{record.description}</p><div><strong>回复人：李雷&nbsp;时间：2017-01-04</strong></div></div>
            }
            dataSource={data2}
          />
        </Modal>
      </PageHeaderLayout>
    );
  }
}
